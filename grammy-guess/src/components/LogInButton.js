const LogInButton = ({ authCreds }) => {

	return (
		<a
			className='loginBtn'
			href={`${authCreds.AUTH_ENDPOINT}?client_id=${authCreds.CLIENT_ID}&redirect_uri=${authCreds.REDIRECT_URI}&response_type=${authCreds.RESPONSE_TYPE}`}
		>
			Login to Spotify
		</a>
	)
}

export default LogInButton