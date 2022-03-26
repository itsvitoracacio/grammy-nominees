import UserWinner from '../components/UserWinner'

const ShareGuesses = ({ userGuesses }) => {

	let userGuessesJsx = []
	userGuesses.forEach(guess => {
		userGuessesJsx.push(
			<UserWinner guess={guess}/>
		)
	})

	return (
		<div className="shareGuessesPageWrapper">
			<div className='shareMyguess'>
				<p>
					These are <span className='underline'>my guesses</span> for the{' '}
					<span className='underline'>GRAMMYs 2022</span>
				</p>
			</div>

			<div className='shareWinner'>
				<div className='shareCategory'>
					<p>Album of The Year</p>
				</div>
				<div className='shareWork'>
					<p>Montero</p>
				</div>
				<div className='shareArtist'>
					<p>Lil Nas X</p>
				</div>
			</div>

			<div className='shareWinner'>
				<div className='shareCategory'>
					<p>Album of The Year</p>
				</div>
				<div className='shareWork'>
					<p>Montero</p>
				</div>
				<div className='shareArtist'>
					<p>Lil Nas X</p>
				</div>
			</div>

			<div className='shareWinner'>
				<div className='shareCategory'>
					<p>Album of The Year</p>
				</div>
				<div className='shareWork'>
					<p>Montero</p>
				</div>
				<div className='shareArtist'>
					<p>Lil Nas X</p>
				</div>
			</div>

			<div className='shareWinner'>
				<div className='shareCategory'>
					<p>Album of The Year</p>
				</div>
				<div className='shareWork'>
					<p>Montero</p>
				</div>
				<div className='shareArtist'>
					<p>Lil Nas X</p>
				</div>
			</div>

			<div className='shareWinner'>
				<div className='shareCategory'>
					<p>Album of The Year</p>
				</div>
				<div className='shareWork'>
					<p>Montero</p>
				</div>
				<div className='shareArtist'>
					<p>Lil Nas X</p>
				</div>
			</div>

			<div className='shareWinner'>
				<div className='shareCategory'>
					<p>Album of The Year</p>
				</div>
				<div className='shareWork'>
					<p>Montero</p>
				</div>
				<div className='shareArtist'>
					<p>Lil Nas X</p>
				</div>
			</div>

			<div className='shareWinner'>
				<div className='shareCategory'>
					<p>Album of The Year</p>
				</div>
				<div className='shareWork'>
					<p>Montero</p>
				</div>
				<div className='shareArtist'>
					<p>Lil Nas X</p>
				</div>
			</div>

			<div className='shareWinner'>
				<div className='shareCategory'>
					<p>Album of The Year</p>
				</div>
				<div className='shareWork'>
					<p>Montero</p>
				</div>
				<div className='shareArtist'>
					<p>Lil Nas X</p>
				</div>
			</div>

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
