import { useParams } from 'react-router-dom'
import NomineeList from '../components/NomineeList'
import AwardsPageHeader from '../components/theme-sensitive/AwardsPageHeader'

const AwardsPage = ({
	userToken,
	authCreds,
	hasGuessed,
	guessUnguess2,
	renderGuessConfirmationToUser,
}) => {

	renderGuessConfirmationToUser()

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
				guessUnguess2={guessUnguess2}
			/>
		</>
	)
}

export default AwardsPage
