import LoggedInAs from './LoggedInAs'
import LogInButton from './LogInButton'
import { Link } from 'react-router-dom'

const SpotifySidebarLogin = ({ userToken, authCreds, logout }) => {
	return (
		<>
			{!userToken ? (
				<div className='spotifyLoginArea'>
					<span>If you wanna listen to it all:</span>
					<LogInButton authCreds={authCreds} />
					<span>And when you're ready:</span>
					<Link to={'/share-your-guesses'} className='spotifyBtn shareBtn'>
						Share Your Guesses
					</Link>
				</div>
			) : (
				<div className='spotifyLoginArea'>
					<LoggedInAs userToken={userToken} logout={logout} />
					<a className='logoutBtn' onClick={logout}>
						Click Here to Logout
					</a>
					<Link to={'/share-your-guesses'} className='spotifyBtn shareBtn'>
						Share Your Guesses
					</Link>
				</div>
			)}
		</>
	)
}

export default SpotifySidebarLogin
