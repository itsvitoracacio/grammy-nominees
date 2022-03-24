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

	const guessUnguess = (currentAwardName, chosenNomineeSpotifyId) => {
		const currentGuess = {
			guessingFor: currentAwardName,
			nomineeChoice: chosenNomineeSpotifyId,
		}

		const repeatedGuess = userGuesses.find(
			guess => guess.guessingFor === currentAwardName
		)

		// unguess
		if (repeatedGuess) {
			const userGuessesWithoutRepeatedGuess = userGuesses.filter(
				guess => guess != repeatedGuess
			)
			userGuesses = userGuessesWithoutRepeatedGuess
			if (repeatedGuess.nomineeChoice === chosenNomineeSpotifyId) return //exit the function without recording the new guess
		}
		// guess
		userGuesses.push(currentGuess)
	}

	return (
		<>
			<h1>{awardNameSpaceCase}</h1>
			<NomineeList
				categoryName={categoryNameSpaceCase}
				awardName={awardNameSpaceCase}
				userToken={userToken}
				authCreds={authCreds}
				userGuesses={userGuesses}
				guessUnguess={guessUnguess}
			/>
		</>
	)
}

export default AwardsPage
