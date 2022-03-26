import { useState, useEffect } from 'react'
import axios from 'axios'
import AllAwards from '../extra/AllAwards'
import Nominee from './Nominee'

const NomineeList = ({
	categoryName,
	awardName,
	userToken,
	authCreds /* , userGuesses */,
	guessesCount,
	guessUnguess,
}) => {
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

	let currentAwardObj
	const currentCategory = AllAwards.find(
		cat => cat.categoryName === categoryName
	)
	const currentAward = currentCategory.categoryAwards.find(
		award => award.awardName === awardName
	)

	let isLoggedIn
	userToken ? (isLoggedIn = true) : (isLoggedIn = false)
	let token
	isLoggedIn ? (token = userToken) : (token = clientToken)

	let nomineeListJsx = []
	currentAward.awardNominees.forEach(currentNominee => {
		nomineeListJsx.push(
			<Nominee
				key={currentNominee.nomineeName}
				eachAward={currentAward}
				eachNominee={currentNominee}
				isLoggedIn={isLoggedIn}
				token={token}
				authCreds={authCreds}
				// userGuesses={userGuesses}
				guessesCount={guessesCount}
				guessUnguess={guessUnguess}
			/>
		)
	})

	return <section className='nomineeListSection'>{nomineeListJsx}</section>
}

export default NomineeList
