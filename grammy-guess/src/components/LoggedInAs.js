import { useEffect, useState } from 'react'
import axios from 'axios'

const LoggedInAs = ({ userToken, logout }) => {
	const [userName, setUserName] = useState('')

	const fetchUser = async () => {
		const { data } = await axios
			.get('https://api.spotify.com/v1/me', {
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			})
			// .then(response => response.json())
			.then(() => setUserName(data.display_name))
			.catch(() => logout())
	}

	useEffect(() => {
		fetchUser()
	}, [])

	return (
		<span>
			Logged in as: <span className='userName'>{userName}</span>
		</span>
	)
}

export default LoggedInAs
