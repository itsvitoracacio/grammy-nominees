import { useParams } from 'react-router-dom'
import NomineeList from '../components/NomineeList'

const AwardsPage = ({
	userToken,
	authCreds,
	userGuesses,
	guessesCount,
	setGuessesCount,
	setCurrentPage,
	currentPage
}) => {
	// setCurrentPage('AwardsPage')
	console.log(currentPage)
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

	// This function is called on the NomineeCardActions component
	const guessUnguess = e => {
		const currentAwardNameUrl = e.target.baseURI.split('/')[4]
		const currentAwardName = toSpaceCaseAward(currentAwardNameUrl)
		const chosenNomineeSpotifyId = e.target.attributes.value.value
		console.dir(e.target);
		const currentGuess = {
			guessingFor: currentAwardName,
			nomineeChoiceId: chosenNomineeSpotifyId,
			nomineeChoiceName: e.target.attributes[3].value,
			nomineeChoiceArtists: e.target.attributes[4].value,
			// Need to add nominee name and nominee artists here so we don't have to do another API call for the share screen
		}

		let newGuessesCount
		const updateUserGuessesAndCount = () => {
			window.localStorage.setItem('userGuesses', JSON.stringify(userGuesses))
			newGuessesCount = userGuesses.length
			window.localStorage.setItem('localStorageGuessesCount', newGuessesCount)
			setGuessesCount(newGuessesCount)
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
					e.target.innerText = 'This is the winner!' // returning vote button to initial state
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
		e.target.innerText = "Actually, it's not them."
	}

	return (
		<>
			<h1>{toSpaceCaseAward(awardNameUrl)}</h1>
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
