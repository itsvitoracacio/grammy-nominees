import LogInButton from './LogInButton'

const NomineeCardActions = ({
	isLoggedIn,
	previewUrlFromSpotify,
	fullUrlFromSpotify,
	authCreds,
	spotifyId,
	playPauseTrack,
	playPauseIcon,
}) => {
	const isTherePreview = previewUrlFromSpotify

	let audioFile
	isLoggedIn ? (audioFile = fullUrlFromSpotify) : (audioFile = previewUrlFromSpotify)

	const checkForPreview = () => {
		if (isTherePreview) return playBtn()
		else return noPreviewLoginBtn()
	}

	const noPreviewLoginBtn = () => {
		return (
			<>
				<div className='spotifyLoginArea'>
					<span className='previewNotAvailableMsg'>Preview not available.</span>
					<LogInButton authCreds={authCreds} />
					<span className='belowLoginMsg'>
						to listen to the full thing
						<br />
						or
					</span>
				</div>
			</>
		)
	}

	const playBtn = () => {
		return (
			<button
				data-playing='false'
				role='switch'
				aria-checked='false'
				onClick={playPauseTrack}
				id={`playPauseButton-${spotifyId}`}
				className='playPauseBtn'
			>
				{playPauseIcon}
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

	const determineWhatToShow = () => {
		if (isLoggedIn) return playBtn()
		else return checkForPreview()
	}

	return (
		determineWhatToShow()
	)
}

export default NomineeCardActions
