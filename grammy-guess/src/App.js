import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './page-templates/Home'
import AboutPage from './page-templates/AboutPage'
import AwardsPage from './page-templates/AwardsPage'
import ShareGuesses from './page-templates/ShareGuesses'
import Header from './layout/Header'
import Sidebar from './layout/Sidebar'
import Footer from './layout/Footer'

/*------TABLE OF CONTENTS------
..HANDLING SPOTIFY USER CREDENTIALS - line 17 (need to include user confirmation for logout)
..MAKING, STORING, AND SHOWING GUESSES - line 53
..RENDERING THE APP - line 168
*/

function App() {
	// HANDLING SPOTIFY USER CREDENTIALS
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

	// MAKING, STORING, AND SHOWING GUESSES
	const guess = () => setHasGuessed(true)
	const unguess = () => setHasGuessed(false)
	const pageUrl = document.URL.split('/')[4] || document.URL.split('/')[3]
	const updateCurrentPageState = () => setCurrentPage(pageUrl)

	const [hasGuessed, setHasGuessed] = useState(false)
	const [userGuesses, setUserGuesses] = useState([])
	const [guessesCount, setGuessesCount] = useState(0)
	const [currentPage, setCurrentPage] = useState('')

	useEffect(() => {
		renderGuessConfirmationToUser()
	}, [currentPage])

	// Function to convert the award name from the url to the format that can match the AllAwards obj
	const toSpaceCaseAward = awardNameUrl => {
		return awardNameUrl
			.replaceAll('-', ' ')
			.replaceAll('Dance Eletronic', 'Dance/Eletronic')
			.replaceAll('Duo Group', 'Duo/Group')
			.replaceAll('Performance Song', 'Performance/Song')
			.replaceAll('Music Small', 'Music/Small')
	}

	const renderGuessConfirmationToUser = () => {
		// const currentPageUrl = document.body.baseURI.split('/')[3]
		const currentAwardPageUrl = document.body.baseURI.split('/')[4]
		if (currentAwardPageUrl) {
			const currentAwardPageName = toSpaceCaseAward(currentAwardPageUrl)
			const userGuessesLocallyStored =
				JSON.parse(window.localStorage.getItem('userGuesses')) || []
			if (userGuessesLocallyStored) {
				// console.log(userGuessesLocallyStored)
				const prevGuessForCurrentPage = userGuessesLocallyStored.find(
					guess => guess.guessingFor === currentAwardPageName
				)
				if (prevGuessForCurrentPage) {
					const { chosenNomineeImg } = prevGuessForCurrentPage
					document.body.style.height = '100vh'
					document.body.style.background = `no-repeat center/40% url(${chosenNomineeImg})`
					guess()
					return
				}
			}
		}
		// console.log('Should revert bg to white')
		// setting the bg to white in case there's no vote for this page's award or if it's not an award page
		document.body.style.background = ''
		unguess()
	}

	const guessUnguess2 = e => {
		// Converting the url path to "space case"
		const currentAwardPageName = toSpaceCaseAward(
			document.body.baseURI.split('/')[4]
		)
		// Grabbing the current votes that are stored locally
		const userGuessesLocallyStored =
			JSON.parse(window.localStorage.getItem('userGuesses')) || []
		// Creating an object to store the current guess' details
		const currentGuess = {
			guessingFor: currentAwardPageName,
			chosenNomineeName: e.target.dataset.nomineeName,
			chosenNomineeArtists: e.target.dataset.artistsList,
			chosenNomineeImg: e.target.dataset.nomineeImg,
		}
		// Destruturing currentGuess to access chosenNomineeImg on its own
		const { chosenNomineeImg } = currentGuess
		// Assinging the user guesses to a new variable just to keep the function semantically correct
		let newUserGuesses = userGuessesLocallyStored

		// CASE: USER HAS ALREADY VOTED AT ALL - checking if there are any guesses already on the local storage
		if (userGuessesLocallyStored) {
			// getting a potentially already-existing guess for the SAME AWARD
			const prevGuessForCurrentPage = userGuessesLocallyStored.find(
				guess => guess.guessingFor === currentAwardPageName
			)

			// CASE: USER IS UNGUESSING OR CHANGING GUESSES - checking if there is a valid value inside the variable 'prevGuessForCurrentPage'
			if (prevGuessForCurrentPage) {
				// creating an arr without the already-existing repeated guess
				const allGuessesWithoutPrevGuessForCurrentPage =
					userGuessesLocallyStored.filter(
						guess => guess != prevGuessForCurrentPage
					)

				// removing from our main arr the previous guess for the same category
				newUserGuesses = allGuessesWithoutPrevGuessForCurrentPage

				// CASE: USER IS UNGUESSING - checking if the current guess is for the SAME NOMINEE as the previous guess the user has made for this award
				if (
					prevGuessForCurrentPage.chosenNomineeName ===
					currentGuess.chosenNomineeName
				) {
					// doing everything we need to do after the user unguesses
					window.localStorage.setItem(
						'userGuesses',
						JSON.stringify(newUserGuesses)
					)
					renderGuessConfirmationToUser()

					// getting out of the function so that the rest of it doesn't run
					return
				}
			}
		}
		// This portion only runs if the current guess is: 1) the first guess at all, 2) the first guess for this award or 3) a different guess for the same award

		// including the current guess in our main userGuessesArr
		newUserGuesses.push(currentGuess)

		// doing everything we need to do after the user guesses
		window.localStorage.setItem('userGuesses', JSON.stringify(newUserGuesses))
		renderGuessConfirmationToUser()
	}

	// RENDERING THE APP
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
					<Route
						path='/'
						element={
							<Home
								renderGuessConfirmationToUser={renderGuessConfirmationToUser}
							/>
						}
					/>
					<Route
						path='/about'
						element={
							<AboutPage
								renderGuessConfirmationToUser={renderGuessConfirmationToUser}
							/>
						}
					/>
					<Route
						path='/:categoryNameUrl/:awardNameUrl'
						element={
							<AwardsPage
								userToken={userToken}
								authCreds={authCreds}
								hasGuessed={hasGuessed}
								guessUnguess2={guessUnguess2}
								renderGuessConfirmationToUser={renderGuessConfirmationToUser}
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
								renderGuessConfirmationToUser={renderGuessConfirmationToUser}
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
