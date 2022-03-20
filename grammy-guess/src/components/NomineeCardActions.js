const NomineeCardActions = ({ isLoggedIn }) => {
	isTherePreview = trackUrlFromSpotify
	const checkForPreview = () => {
		if (!isTherePreview)
			<span className='previewNotAvailableMsg'>Preview not available.</span>
	}

	const loginBtn = () => {
		return (
			<div className='spotifyLoginArea'>
				<a
					className='loginBtn'
					href={`${authCreds.AUTH_ENDPOINT}?client_id=${authCreds.CLIENT_ID}&redirect_uri=${authCreds.REDIRECT_URI}&response_type=${authCreds.RESPONSE_TYPE}`}
				>
					Login to Spotify
				</a>
				<span className='belowLoginMsg'>
					to listen to the full thing
					<br />
					and vote!
				</span>
			</div>
		)
	}

	const playBtn = () => {
		return (
			<button className='spotifyBtn' id='playBtn'>
				Listen to the full thing
			</button>
		)
	}

	const voteBtn = () => {
		return (
			<button
				className='spotifyBtn'
				id='voteBtn'
				value='Vote: "This is the winner!"'
			>
				Vote: 'This is the winner!'
			</button>
		)
	}

	const displayButtons = () => {
		if (isLoggedIn) playBtn(), voteBtn()
		else loginBtn()
	}

	return checkForPreview(), displayButtons()
}

export default NomineeCardActions
