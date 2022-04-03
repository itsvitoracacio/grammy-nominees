import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NomineeList from '../components/NomineeList'
import AwardsPageHeader from '../components/theme-sensitive/AwardsPageHeader'

const AwardsPage = ({
	hasGuessed,
	guessUnguess,
	renderGuessConfirmation,
	closeSidebar,
}) => {
	useEffect(() => {
		closeSidebar()
		renderGuessConfirmation()
	}, [])
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

	/* const checkForPopUpNeed = () => {
		// console.log(window.localStorage.getItem('userGuesses'))
		if (window.localStorage.getItem('userGuesses')) {
			console.log('hey')
		}
		else renderPopUp()
	} */

	const renderPopUp = () => {
		return (
			<div className='instabilityPopUp' id='instabilityPopUp'>
				<span onClick={closePopUp}>close</span>
				<p>
					If some images aren't loading, that's probably because of an
					instability with the Spotify API.
				</p>
				<p>
					In that case, go to some other award page and switch between them a
					few times until images start to appear.
				</p>
			</div>
		)
	}

	const closePopUp = () => {
		document.querySelector('.instabilityPopUp').style.display = 'none'
	}

	const renderAwardsPage = () => {
		renderGuessConfirmation()
		return (
			<>
				<AwardsPageHeader
					categoryName={toSpaceCaseAward(awardNameUrl)}
					hasGuessed={hasGuessed}
				/>
				<NomineeList
					categoryName={toSpaceCaseCat(categoryNameUrl)}
					awardName={toSpaceCaseAward(awardNameUrl)}
					guessUnguess={guessUnguess}
					closeSidebar={closeSidebar}
				/>
				{renderPopUp()}
			</>
		)
	}

	return renderAwardsPage()
}

export default AwardsPage
