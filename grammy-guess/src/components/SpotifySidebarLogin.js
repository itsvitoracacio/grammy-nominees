import LoggedInAs from './LoggedInAs'
import LogInButton from './LogInButton'

const SpotifySidebarLogin = ({ userToken, authCreds, logout }) => {
	return (
		<>
			{!userToken ? (
				<div className='spotifyLoginArea'>
					<LogInButton authCreds={authCreds}/>
					<span className='belowLoginMsg'>
						to listen to the nominees
						<br />
						and vote!
					</span>
				</div>
			) : (
				<div className='spotifyLoginArea'>
					<LoggedInAs userToken={userToken} />
					<a className='logoutBtn' onClick={logout}>
						Click Here to Logout
					</a>
					<a className='spotifyBtn shareBtn'>Share Your Winners on Social</a>
				</div>
			)}
		</>
	)
}

export default SpotifySidebarLogin
