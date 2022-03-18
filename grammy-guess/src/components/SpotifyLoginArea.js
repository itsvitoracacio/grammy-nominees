import LoggedInAs from './LoggedInAs'

const SpotifyLoginArea = ({ userToken, authCreds, logout }) => {
	return (
		<>
			{!userToken ? (
				<div className='spotifyLoginArea'>
					<a
						className='loginBtn'
						href={`${authCreds.AUTH_ENDPOINT}?client_id=${authCreds.CLIENT_ID}&redirect_uri=${authCreds.REDIRECT_URI}&response_type=${authCreds.RESPONSE_TYPE}`}
					>
						Login to Spotify
					</a>
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

export default SpotifyLoginArea
