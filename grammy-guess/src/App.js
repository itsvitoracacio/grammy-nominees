import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './page-templates/Home'
import AboutPage from './page-templates/AboutPage'
import AwardsPage from './page-templates/AwardsPage'
import ShareGuesses from './page-templates/ShareGuesses'
import Header from './layout/Header'
import Sidebar from './layout/Sidebar'
import Footer from './layout/Footer'

function App() {
	const authCreds = {
		CLIENT_ID: '9d34d6d2667e4f77b6d15e8e468091d6',
		REDIRECT_URI: 'http://localhost:3000',
		// REDIRECT_URI: 'https://idyllic-douhua-a03845.netlify.app/',
		AUTH_ENDPOINT: 'https://accounts.spotify.com/authorize',
		RESPONSE_TYPE: 'token',
	}

	const [userToken, setUserToken] = useState('')

	useEffect(() => {
		// Grabbing the user token when the user is logged into Spotify
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

	// Function for the user to log out of Spotify. Need to add UX confirmation of logging out
	const logout = () => {
		setUserToken('')
		window.localStorage.removeItem('token')
	}

	const pageUrl = document.URL.split('/')[3]

	const [hasGuessed, setHasGuessed] = useState(false)
	// let userGuesses = [] // This arr will store user guesses before they're saved to localStorage
	const [userGuesses, setUserGuesses] = useState([])
	const [guessesCount, setGuessesCount] = useState(0)
	const [currentPage, setCurrentPage] = useState('')

	const guessUnguess2 = () => {
		hasGuessed ? unguess() : guess()
	}
	const guess = () => setHasGuessed(true)
	const unguess = () => setHasGuessed(false)

	return (
		<>
			<Header
				className={
					currentPage != 'share-screen'
						? 'headerRegularPages'
						: 'headerShareScreen'
				}
				hasGuessed={hasGuessed}
			/>
			<Sidebar userToken={userToken} authCreds={authCreds} logout={logout} />
			<main
				className={
					pageUrl != 'share-screen' ? 'mainRegularPages' : 'mainShareScreen'
				}
			>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/about' element={<AboutPage />} />
					<Route
						path='/:categoryNameUrl/:awardNameUrl'
						element={
							<AwardsPage
								userToken={userToken}
								authCreds={authCreds}
								userGuesses={userGuesses}
								guessesCount={guessesCount}
								setGuessesCount={setGuessesCount}
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								hasGuessed={hasGuessed}
								guessUnguess2={guessUnguess2}
							/>
						}
					/>
					<Route
						path='/share-your-guesses'
						element={
							<ShareGuesses
								userGuesses={userGuesses}
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
							/>
						}
					/>
				</Routes>
			</main>
			<Footer />
		</>
	)
}

export default App
