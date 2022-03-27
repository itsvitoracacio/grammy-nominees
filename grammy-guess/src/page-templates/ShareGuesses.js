import UserWinner from '../components/UserWinner'
import html2canvas from 'html2canvas'

const ShareGuesses = ({ userGuesses, currentPage, setCurrentPage }) => {
	setCurrentPage('share-screen')
	console.log(currentPage)
	const guessesToShowJSON = window.localStorage.getItem('userGuesses')
	const guessesToShow = JSON.parse(guessesToShowJSON)

	let userGuessesJsx = []
	guessesToShow.forEach(guess => {
		userGuessesJsx.push(<UserWinner key={Math.random()} guess={guess} />)
	})

	const shareSaveToDevice = () => {
		const downloadBtn = document.querySelector('.shareSaveToDevice')
		html2canvas(document.querySelector('.shareGuessesPageWrapper')).then(
			canvas => {
				downloadBtn.href = canvas.toDataURL('img/png')
				downloadBtn.download = 'Grammy-GuessTheWinners.png'
			}
		)
	}

	return (
		<>
			<a className='shareSaveToDevice spotifyBtn' onClick={shareSaveToDevice}>
				Save To Device
			</a>
			{/* <button className='shareTweet'>Share on Twitter</button> */}
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
						go to <span className='underline'>grammygame.gg</span>, discover the
						nominees and{' '}
						<span className='underline'>share your guesses too</span>
					</p>
				</div>
			</div>
		</>
	)
}

export default ShareGuesses
