import { useParams } from 'react-router-dom'
import NomineeList from '../components/NomineeList'

const AwardsPage = ({ userToken, authCreds, userGuesses }) => {
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
		const localStorageUserGuesses = window.localStorage.getItem('userGuesses')
		let repeatedGuess // variable declared outside of conditional statemente for scoping reasons
		if (localStorageUserGuesses) {
			userGuesses = JSON.parse(localStorageUserGuesses) // putting the locally stored in an array we can manipulate temporarily
			console.log(userGuesses)
			repeatedGuess = userGuesses.find(
				guess => guess.guessingFor === currentAwardName
			)
			console.log(repeatedGuess)
			// Unguess or Change Guesses for the same category
			if (repeatedGuess) {
				const userGuessesWithoutRepeatedGuess = userGuesses.filter(
					guess => guess != repeatedGuess
				)
				userGuesses = userGuessesWithoutRepeatedGuess // removing previous guess for the same category

				// IF unguessing
				if (repeatedGuess.nomineeChoice === chosenNomineeSpotifyId) {
					e.target.innerText = 'This is the winner!' // returning vote button to initial state
				}
				// IF changing guesses
				else {
					userGuesses.push(currentGuess) // adding new guess for the same category
					// HERE WE SHOULD CHECK IF ALL OTHER BUTTONS HAVE THE TEXT "THIS IS THE WINNER!", AND IF NOT, SET IT
					e.target.innerText = 'Actually, I changed my mind.' // showing to the user that we got their vote
				}

				// Storing the new user guesses array in the local storage
				window.localStorage.setItem('userGuesses', JSON.stringify(userGuesses))
			}
			// New guess for this category
			else {
				userGuesses.push(currentGuess)
				window.localStorage.setItem('userGuesses', JSON.stringify(userGuesses))
				componentDidMount() {
					document.body.style.backgroundColor = "green";
				}
				e.target.innerText = 'Actually, I changed my mind.'
			}
		}
		// First guess at all
		else {
			userGuesses.push(currentGuess)
			window.localStorage.setItem('userGuesses', JSON.stringify(userGuesses))
			console.dir(e.target)
			e.target.innerText = 'Actually, I changed my mind.'
		}
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
