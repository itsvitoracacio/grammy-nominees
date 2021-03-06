import { useState, useEffect } from 'react'
import axios from 'axios'
import AllAwards from '../extra/AllAwards'
import Nominee from './Nominee'

const NomineeList = ({ categoryName, awardName, guessUnguess, closeSidebar }) => {
	// App credentials to be used for authorization (provided by our Spotify app)
	const CLIENT_ID = '9d34d6d2667e4f77b6d15e8e468091d6'
	const CLIENT_SECRET = '32d7d019ad2443e390a34215dbcaed25'

	const [clientToken, setClientToken] = useState('')

	const fetchClientToken = () => {
		axios('https://accounts.spotify.com/api/token', {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
			},
			data: 'grant_type=client_credentials',
			method: 'POST',
		}).then(tokenResponse => {
			setClientToken(tokenResponse.data.access_token)
		})
	}

	useEffect(() => {
		fetchClientToken()
	}, [])

	const currentCategory = AllAwards.find(
		cat => cat.categoryName === categoryName
	)
	const currentAward = currentCategory.categoryAwards.find(
		award => award.awardName === awardName
	)

	let nomineeListJsx = []
	currentAward.awardNominees.forEach(currentNominee => {
		nomineeListJsx.push(
			<Nominee
				key={currentNominee.nomineeName}
				eachAward={currentAward}
				eachNominee={currentNominee}
				clientToken={clientToken}
				guessUnguess={guessUnguess}
				closeSidebar={closeSidebar}
			/>
		)
	})

	return <section className='nomineeListSection'>{nomineeListJsx}</section>
}

export default NomineeList
