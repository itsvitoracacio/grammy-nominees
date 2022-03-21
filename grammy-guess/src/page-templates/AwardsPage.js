// import NomineeList from '../components/NomineeList'
// import Vote from '../components/Vote'
// import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NomineeList from '../components/NomineeList'

const AwardsPage = ({ userToken, authCreds }) => {
	// const [isLoading, setIsLoading] = useState(true)

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

	return (
		<>
			<h1>{awardNameSpaceCase}</h1>
			<NomineeList
				categoryName={categoryNameSpaceCase}
				awardName={awardNameSpaceCase}
				userToken={userToken}
				authCreds={authCreds}
			/>
		</>
	)

	// console.log(token)

	// return (
	//   <>
	//     <NomineeList  currentAwardName={currentAwardName} token={token}/>
	//     <Vote currentAwardName={currentAwardName} token={token} authCreds={authCreds}/>
	//   </>
	// )
}

export default AwardsPage
