import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
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
	const closeSidebar = () => {
		document.body.children[1].children[1].checked = false
	}

	// MAKING, STORING, AND SHOWING GUESSES
	const guess = () => setHasGuessed(true)
	const unguess = () => setHasGuessed(false)
	const pageUrl = document.URL.split('/')[4] || document.URL.split('/')[3]
	// const updateCurrentPageState = () => setCurrentPage(pageUrl)

	const [hasGuessed, setHasGuessed] = useState(false)
	const [currentPage, setCurrentPage] = useState('')

	useEffect(() => {
		renderGuessConfirmation()
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

	const renderGuessConfirmation = () => {
		const currentAwardPageUrl = document.body.baseURI.split('/')[4]
		if (currentAwardPageUrl) {
			/* document.body.children[1].children[4].style.height = '100vh'
			document.body.children[1].children[4].style.paddingTop = '10rem' */
			const currentAwardPageName = toSpaceCaseAward(currentAwardPageUrl)
			const userGuessesLocallyStored =
				JSON.parse(window.localStorage.getItem('userGuesses')) || []
			if (userGuessesLocallyStored) {
				// Insert sidebar guess confirmation here

				let categoriesGuessedUrlFromLocalStorage = []
				userGuessesLocallyStored.forEach(guess => {
					categoriesGuessedUrlFromLocalStorage.push(guess.guessingForUrl)
				})

				categoriesGuessedUrlFromLocalStorage.forEach(categoryUrl => {
					const voteTick = React.createElement(
						'span',
						{
							style: {
								fontFamily: 'HelveticaNeueBold',
								fontSize: '0.85rem',
								lineHeight: '1',
								backgroundColor: '#1ed761',
								border: '0.5px solid #878787',
								padding: '0.15rem 0.65rem 0.15rem 0.5rem',
								borderRadius: '20px',
							},
						},
						'\u2713'
					)
					ReactDOM.render(voteTick, document.getElementById(categoryUrl))
				})

				const prevGuessForCurrentPage = userGuessesLocallyStored.find(
					guess => guess.guessingFor === currentAwardPageName
				)
				if (prevGuessForCurrentPage) {
					const { chosenNomineeImg } = prevGuessForCurrentPage
					if (document.body.clientWidth < 768) {
						document.body.style.background = `no-repeat center/80% url(${chosenNomineeImg})`
					} else {
						document.body.style.background = `no-repeat center/40% url(${chosenNomineeImg})`
					}
					document.body.style.backgroundColor = '#f8f1e8'
					guess()
					return
				}
			}
		}

		// setting the bg to white in case there's no guess for this page's award or if it's not an award page
		document.body.style.background = ''
		document.body.style.backgroundColor = '#fff'
		unguess()
	}

	const guessUnguess = e => {
		// Converting the url path to "space case"
		const currentAwardPageUrl = document.body.baseURI.split('/')[4]
		const currentAwardPageName = toSpaceCaseAward(currentAwardPageUrl)
		// Grabbing the current guesses that are stored locally
		const userGuessesLocallyStored =
			JSON.parse(window.localStorage.getItem('userGuesses')) || []
		// Creating an object to store the current guess' details
		const currentGuess = {
			guessingFor: currentAwardPageName,
			guessingForUrl: currentAwardPageUrl,
			chosenNomineeName: e.target.dataset.nomineeName,
			chosenNomineeArtists: e.target.dataset.artistsList,
			chosenNomineeImg: e.target.dataset.nomineeImg,
		}
		// Destruturing currentGuess to access chosenNomineeImg on its own
		// const { chosenNomineeImg } = currentGuess
		// Assinging the user guesses to a new variable just to keep the function semantically correct
		let newUserGuesses = userGuessesLocallyStored

		// CASE: USER HAS ALREADY GUESSED AT ALL - checking if there are any guesses already on the local storage
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
						guess => guess !== prevGuessForCurrentPage
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
					renderGuessConfirmation()

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
		renderGuessConfirmation()
	}

	// RENDERING THE APP
	return (
		<>
			<Header
				className={
					currentPage !== 'share-screen'
						? 'headerRegularPages'
						: 'headerShareScreen'
				}
				hasGuessed={hasGuessed}
			/>
			<Sidebar renderGuessConfirmation={renderGuessConfirmation} />
			<main
				className={
					pageUrl !== 'share-screen' ? 'mainRegularPages' : 'mainShareScreen'
				}
			>
				<Routes>
					<Route
						path='/'
						element={
							<Home
								renderGuessConfirmation={renderGuessConfirmation}
								closeSidebar={closeSidebar}
							/>
						}
					/>
					<Route
						path='/about'
						element={
							<AboutPage
								renderGuessConfirmation={renderGuessConfirmation}
								closeSidebar={closeSidebar}
							/>
						}
					/>
					<Route
						path='/:categoryNameUrl/:awardNameUrl'
						element={
							<AwardsPage
								hasGuessed={hasGuessed}
								guessUnguess={guessUnguess}
								renderGuessConfirmation={renderGuessConfirmation}
								closeSidebar={closeSidebar}
							/>
						}
					/>
					<Route
						path='/share-your-guesses'
						element={
							<ShareGuesses
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
								renderGuessConfirmation={renderGuessConfirmation}
								closeSidebar={closeSidebar}
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
