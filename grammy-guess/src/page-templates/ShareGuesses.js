import { useEffect } from 'react'
import UserGuess from '../components/UserGuess'
import html2canvas from 'html2canvas'

const ShareGuesses = ({
	currentPage,
	setCurrentPage,
	renderGuessConfirmation,
	closeSidebar
}) => {
	// renderGuessConfirmation()
	// closeSidebar()
	useEffect(() => {
    closeSidebar()
    renderGuessConfirmation()
  }, [])
	setCurrentPage('share-screen')
	const guessesToShowJSON = window.localStorage.getItem('userGuesses')
	const guessesToShow = JSON.parse(guessesToShowJSON)

	let userGuessesJsx = []
	guessesToShow.forEach(guess => {
		userGuessesJsx.push(<UserGuess key={Math.random()} guess={guess} />)
	})

	const shareDownload = () => {
		const downloadBtn = document.querySelector('.shareDownload')
		html2canvas(document.querySelector('.shareGuessesPageWrapper')).then(
			canvas => {
				downloadBtn.href = canvas.toDataURL('img/png')
				downloadBtn.download = 'Grammy-GuessTheWinners.png'
			}
		)
	}

	return (
		<>
			<h1>Share Your Guesses!</h1>
			<div className='shareGuessesBtnsArea'>
				<a className='shareBtn shareDownload' onClick={shareDownload}>
					Download Guesses
				</a>
				<span>And share it with your friends!</span>
			</div>
			<div className='shareGuessesPageWrapper'>
				<div className='shareMyGuess'>
					<p>
						These are <span className='underline'>my guesses</span> for the{' '}
						<span className='underline'>GRAMMYs 2022</span>
					</p>
				</div>
				{userGuessesJsx}
				<div className='footer'>
					<p>
						go to <span className='underline'>grammyguess.netlify.app</span>, discover the
						nominees and{' '}
						<span className='underline'>share your guesses too</span>
					</p>
				</div>
			</div>
		</>
	)
}

export default ShareGuesses
