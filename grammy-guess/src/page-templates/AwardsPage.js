import { useParams } from 'react-router-dom'
import NomineeList from '../components/NomineeList'
import AwardsPageHeader from '../components/theme-sensitive/AwardsPageHeader'

const AwardsPage = ({
	userToken,
	authCreds,
	userGuesses,
	guessesCount,
	setGuessesCount,
	setCurrentPage,
	currentPage,
	hasGuessed,
	guessUnguess2
}) => {
	// Grab the award name and the category name from the url to determine which nominees to show
	const { categoryNameUrl, awardNameUrl } = useParams()
	// Function to convert the category name from the url to the format that can match the AllAwards obj
	const toSpaceCaseCat = categoryNameUrl => {
		return categoryNameUrl
			.replaceAll('-', ' ')
			.replaceAll('Dance Eletronic', 'Dance/Eletronic')
			.replaceAll('Gospel Contemporary', 'Gospel/Contemporary')
			.replaceAll('Video Film', 'Video/Film')
			.replaceAll('Composing Arranging', 'Composing/Arranging')
	}

	// Function to convert the award name from the url to the format that can match the AllAwards obj
	const toSpaceCaseAward = awardNameUrl => {
		return awardNameUrl
			.replaceAll('-', ' ')
			.replaceAll('Dance Eletronic', 'Dance/Eletronic')
			.replaceAll('Duo Group', 'Duo/Group')
			.replaceAll('Performance Song', 'Performance/Song')
			.replaceAll('Music Small', 'Music/Small')
	}

	document.body.style.height = '100vh'

	// This function is called on the Nominee component
	const guessUnguess = e => {
		// Converting the current page award name from the page url into 'Space Case'
		const currentPageAwardName = toSpaceCaseAward(awardNameUrl)

		// Getting data from the button clicked to vote and using it to create an object to use as the new guess
		const chosenNomineeSpotifyId = e.target.attributes.value.value
		const currentGuess = {
			guessingFor: currentPageAwardName,
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
			// toggleAwardsPageTheme(currentGuess.nomineeChoiceImg)
		}

		/* const toggleAwardsPageTheme = nomineeChoiceImg => {
			// This represent the previous state. Should be specific to each award page
			const isBgImgOn = document.body.classList.contains('bgImgOn')
			// Set new state based on previous state
			if (isBgImgOn) {
				document.body.style.background = ''
				switchTextColors('#000')
				applyTheme('hasntVotedYet')
			} else {
				document.body.style.background = `no-repeat top/cover url(${nomineeChoiceImg})`
				switchTextColors('#fff')
				applyTheme('hasVoted')
			}
			// Update state based on latest settings
			document.body.classList.toggle('bgImgOn')
		} */

		/* const switchTextColors = color => {
			let headerLogoSrc
			let spotifyLogoSrc
			let sidebarOpenBtnColor
			let footerTextColor
			if (color === '#000') {
				headerLogoSrc = '../64th-grammy-black.svg'
				spotifyLogoSrc = '../spotify-logo-black.png'
				sidebarOpenBtnColor = 'rgba(0, 0, 0, 0.6)'
				footerTextColor = '#878787'
			} else if (color === '#fff') {
				headerLogoSrc = '../64th-grammy-white.svg'
				spotifyLogoSrc = '../spotify-logo-white.png'
				sidebarOpenBtnColor = 'rgba(255, 255, 255, 0.75)'
				footerTextColor = 'rgba(255, 255, 255, 0.9)'
			}
			document.children[0].children[1].children[1].children[0].children[0].children[0].attributes[0].value =
				headerLogoSrc
			document.children[0].children[1].children[1].children[2].style.color =
				sidebarOpenBtnColor
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
		} */

		const localStorageUserGuesses = window.localStorage.getItem('userGuesses') // this comes as a JSON string
		let repeatedGuess
		if (localStorageUserGuesses) {
			userGuesses = JSON.parse(localStorageUserGuesses) // putting the JSON in an array we can manipulate
			repeatedGuess = userGuesses.find(
				guess => guess.guessingFor === currentPageAwardName
			)

			// If unguessing or changing guesses for the same category
			if (repeatedGuess) {
				const userGuessesWithoutRepeatedGuess = userGuesses.filter(
					guess => guess != repeatedGuess
				)
				userGuesses = userGuessesWithoutRepeatedGuess // removing previous guess for the same category
				updateUserGuessesAndCount()
				/* console.log(
					`This should decrease - arr.length: ${newGuessesCount}, state: ${guessesCount}`
				) */

				// IF unguessing
				if (repeatedGuess.nomineeChoiceId === chosenNomineeSpotifyId) {
					window.localStorage.setItem(
						'userGuesses',
						JSON.stringify(userGuesses)
					)
					return
				}
			}
		}

		// 1) First guess at all, 2) First guess for this category or 3) Changing guesses
		userGuesses.push(currentGuess)
		updateUserGuessesAndCount()
		/* console.log(
			`This should increase - arr.length: ${newGuessesCount}, state: ${guessesCount}`
		) */
	}

	return (
		<>
			<AwardsPageHeader
				categoryName={toSpaceCaseAward(awardNameUrl)}
				hasGuessed={hasGuessed}
			/>
			<NomineeList
				categoryName={toSpaceCaseCat(categoryNameUrl)}
				awardName={toSpaceCaseAward(awardNameUrl)}
				userToken={userToken}
				authCreds={authCreds}
				// userGuesses={userGuesses}
				guessesCount={guessesCount}
				guessUnguess={guessUnguess}
				guessUnguess2={guessUnguess2}
			/>
		</>
	)
}

export default AwardsPage
