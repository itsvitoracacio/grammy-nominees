import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './page-templates/Home'
import AboutPage from './page-templates/AboutPage'
import AwardsPage from './page-templates/AwardsPage'
import Header from './layout/Header'
import Sidebar from './layout/Sidebar'
import Footer from './layout/Footer'

function App() {

	const authCreds = {
		CLIENT_ID: '9d34d6d2667e4f77b6d15e8e468091d6',
		REDIRECT_URI: 'http://localhost:3000',
		AUTH_ENDPOINT: 'https://accounts.spotify.com/authorize',
		RESPONSE_TYPE: 'token',
	}

	const [userToken, setUserToken] = useState('')

	useEffect(() => {
		const hash = window.location.hash
		let userToken = window.localStorage.getItem('token')

		if (!userToken && hash) {
			userToken = hash
				.substring(1)
				.split('&')
				.find(elem => elem.startsWith('access_token'))
				.split('=')[1]

			window.location.hash = ''
			window.localStorage.setItem('token', userToken)
		}

		setUserToken(userToken)
	}, [])

	const logout = () => {
		setUserToken('')
		window.localStorage.removeItem('token')
	}

	return (
		<>
			<Header />
			<Sidebar userToken={userToken} authCreds={authCreds} logout={logout} />
			<main>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/about' element={<AboutPage />} />
					<Route
						path='/:awardName'
						element={<AwardsPage userToken={userToken} />}
					/>
				</Routes>
			</main>
			<Footer />
		</>
	)
}

export default App
