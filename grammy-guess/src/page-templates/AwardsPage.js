import { useParams } from 'react-router-dom'
import NomineeList from '../components/NomineeList'

const AwardsPage = ({
	userToken,
	authCreds,
	userGuesses,
	guessesCount,
	setGuessesCount,
	setCurrentPage,
	currentPage,
}) => {
	// setCurrentPage('AwardsPage')
	// console.log(currentPage)
	const { categoryNameUrl, awardNameUrl } = useParams()

	const toSpaceCaseCat = categoryNameUrl => {
		return categoryNameUrl
			.replaceAll('-', ' ')
			.replaceAll('Dance Eletronic', 'Dance/Eletronic')
			.replaceAll('Gospel Contemporary', 'Gospel/Contemporary')
			.replaceAll('Video Film', 'Video/Film')
			.replaceAll('Composing Arranging', 'Composing/Arranging')
	}

	const toSpaceCaseAward = awardNameUrl => {
		return awardNameUrl
			.replaceAll('-', ' ')
			.replaceAll('Dance Eletronic', 'Dance/Eletronic')
			.replaceAll('Duo Group', 'Duo/Group')
			.replaceAll('Performance Song', 'Performance/Song')
			.replaceAll('Music Small', 'Music/Small')
	}

	document.body.style.height = '100vh'

	// This function is called on the NomineeCardActions component
	const guessUnguess = e => {
		const currentAwardNameUrl = e.target.baseURI.split('/')[4]
		const currentAwardName = toSpaceCaseAward(currentAwardNameUrl)
		const chosenNomineeSpotifyId = e.target.attributes.value.value
		// console.dir(e.target)
		const currentGuess = {
			guessingFor: currentAwardName,
			nomineeChoiceId: chosenNomineeSpotifyId,
			nomineeChoiceName: e.target.attributes[3].value,
			nomineeChoiceArtists: e.target.attributes[4].value,
			nomineeChoiceImg: e.target.attributes[5].value,
		}

		let newGuessesCount
		const updateUserGuessesAndCount = () => {
			window.localStorage.setItem('userGuesses', JSON.stringify(userGuesses))
			newGuessesCount = userGuesses.length
			window.localStorage.setItem('localStorageGuessesCount', newGuessesCount)
			setGuessesCount(newGuessesCount)
			toggleBgImage(currentGuess.nomineeChoiceImg)
		}

		const toggleBgImage = nomineeChoiceImg => {
			const isBgImgOn = document.body.classList.contains('bgImgOn')
			if (isBgImgOn) {
				document.body.style.background = ''
				switchTextColors('#000')
			} else {
				document.body.style.background = `no-repeat top/cover url(${nomineeChoiceImg})`
				switchTextColors('#fff')
			}
			document.body.classList.toggle('bgImgOn')
		}

		const switchTextColors = color => {
			let spotifyLogoSrc
			let headerLogoSrc
			let sidebarToggleColor
			let footerTextColor
			if (color === '#000') {
				headerLogoSrc = '../64th-grammy-black.svg'
				spotifyLogoSrc = '../spotify-logo-black.png'
				sidebarToggleColor = 'rgba(0, 0, 0, 0.6)'
				footerTextColor = '#878787'
			} else if (color === '#fff') {
				headerLogoSrc = '../64th-grammy-white.svg'
				spotifyLogoSrc = '../spotify-logo-white.png'
				sidebarToggleColor = 'rgba(255, 255, 255, 0.75)'
				footerTextColor = 'rgba(255, 255, 255, 0.9)'
			}
			document.children[0].children[1].children[1].children[0].children[0].children[0].attributes[0].value =
				headerLogoSrc
			document.children[0].children[1].children[1].children[2].style.color =
				sidebarToggleColor
			document.children[0].children[1].children[1].children[5].style.color =
				footerTextColor
			document.children[0].children[1].children[1].children[5].children[0].children[0].children[0].style.color =
				footerTextColor
			document.children[0].children[1].children[1].children[4].children[0].style.color =
				color
			document.children[0].children[1].children[1].children[4].children[1].style.color =
				color
			document.children[0].children[1].children[1].children[4].children[1].children[1].attributes[2].value =
				spotifyLogoSrc
		}

		const localStorageUserGuesses = window.localStorage.getItem('userGuesses') // this comes as a JSON string
		let repeatedGuess
		if (localStorageUserGuesses) {
			userGuesses = JSON.parse(localStorageUserGuesses) // putting the JSON in an array we can manipulate
			repeatedGuess = userGuesses.find(
				guess => guess.guessingFor === currentAwardName
			)

			// If unguessing or changing guesses for the same category
			if (repeatedGuess) {
				const userGuessesWithoutRepeatedGuess = userGuesses.filter(
					guess => guess != repeatedGuess
				)
				userGuesses = userGuessesWithoutRepeatedGuess // removing previous guess for the same category
				updateUserGuessesAndCount()
				console.log(
					`This should decrease - arr.length: ${newGuessesCount}, state: ${guessesCount}`
				)

				// IF unguessing
				if (repeatedGuess.nomineeChoiceId === chosenNomineeSpotifyId) {
					window.localStorage.setItem(
						'userGuesses',
						JSON.stringify(userGuesses)
					)
					// e.target.innerText = 'This is the winner!' // returning vote button to initial state
					return
				}
			}
		}

		// 1) First guess at all, 2) First guess for this category or 3) Changing guesses
		userGuesses.push(currentGuess)
		updateUserGuessesAndCount()
		console.log(
			`This should increase - arr.length: ${newGuessesCount}, state: ${guessesCount}`
		)
		// e.target.innerText = "Actually, it's not them."
	}

	return (
		<>
			<h1>{toSpaceCaseAward(awardNameUrl)}</h1>
			<div className='apiCompliance'>
				<span>
					All nominee info
					<br />
					is provided by
				</span>
				<img width='70px' height='21.16px' src='../spotify-logo-black.png' />
			</div>
			<NomineeList
				categoryName={toSpaceCaseCat(categoryNameUrl)}
				awardName={toSpaceCaseAward(awardNameUrl)}
				userToken={userToken}
				authCreds={authCreds}
				// userGuesses={userGuesses}
				guessesCount={guessesCount}
				guessUnguess={guessUnguess}
			/>
		</>
	)
}

export default AwardsPage
