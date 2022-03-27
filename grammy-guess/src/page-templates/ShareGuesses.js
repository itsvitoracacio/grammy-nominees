import UserWinner from '../components/UserWinner'

const ShareGuesses = ({ userGuesses, currentPage, setCurrentPage }) => {
	setCurrentPage('share-screen')
	console.log(currentPage)
	const guessesToShowJSON = window.localStorage.getItem('userGuesses')
	const guessesToShow = JSON.parse(guessesToShowJSON)

	let userGuessesJsx = []
	guessesToShow.forEach(guess => {
		userGuessesJsx.push(<UserWinner key={Math.random()} guess={guess} />)
	})

	return (
		<div className='shareGuessesPageWrapper'>
			{' '}
			{/* Remove this class and div when we're able to use different css files on different pages -> will also need to change the CSS file for this page */}
			<div className='shareMyguess'>
				<p>
					These are <span className='underline'>my guesses</span> for the{' '}
					<span className='underline'>GRAMMYs 2022</span>
				</p>
			</div>
			{userGuessesJsx}
			<div className='footer'>
				<p>
					go to <span className='underline'>grammygame.gg</span>, discover the
					nominees and <span className='underline'>share your guesses too</span>
				</p>
			</div>
		</div>
	)
}

export default ShareGuesses
