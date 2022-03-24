import { useParams } from 'react-router-dom'
import NomineeList from '../components/NomineeList'

const AwardsPage = ({
	userToken,
	authCreds,
	userGuesses,
	guessesCount,
	setGuessesCount,
}) => {
	const { categoryNameUrl, awardNameUrl } = useParams()

	const categoryNameSpaceCase = categoryNameUrl
		.replaceAll('-', ' ')
		.replaceAll('Dance Eletronic', 'Dance/Eletronic')
		.replaceAll('Gospel Contemporary', 'Gospel/Contemporary')
		.replaceAll('Video Film', 'Video/Film')
		.replaceAll('Composing Arranging', 'Composing/Arranging')
	const awardNameSpaceCase = awardNameUrl
		.replaceAll('-', ' ')
		.replaceAll('Dance Eletronic', 'Dance/Eletronic')
		.replaceAll('Duo Group', 'Duo/Group')
		.replaceAll('Performance Song', 'Performance/Song')
		.replaceAll('Music Small', 'Music/Small')

	const guessUnguess = e => {
		const currentAwardName = e.target.baseURI.split('/')[4]
		const chosenNomineeSpotifyId = e.target.attributes.value.value
		const currentGuess = {
			guessingFor: currentAwardName,
			nomineeChoice: chosenNomineeSpotifyId,
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
				setGuessesCount(guessesCount--)

				// IF unguessing
				if (repeatedGuess.nomineeChoice === chosenNomineeSpotifyId) {
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
		setGuessesCount(guessesCount++)
		window.localStorage.setItem('userGuesses', JSON.stringify(userGuesses))
		// HERE WE SHOULD CHECK IF ALL OTHER BUTTONS HAVE THE TEXT "THIS IS THE WINNER!", AND IF NOT, SET IT
		e.target.innerText = 'Actually, I changed my mind.'
	}

	return (
		<>
			<h1>{awardNameSpaceCase}</h1>
			<NomineeList
				categoryName={categoryNameSpaceCase}
				awardName={awardNameSpaceCase}
				userToken={userToken}
				authCreds={authCreds}
				// userGuesses={userGuesses}
				guessUnguess={guessUnguess}
			/>
		</>
	)
}

export default AwardsPage
