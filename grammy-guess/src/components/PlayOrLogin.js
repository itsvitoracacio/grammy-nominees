import LogInButton from './LogInButton'

const PlayOrLogin = ({
	isLoggedIn,
	isTherePreview,
	authCreds,
	spotifyId,
	playPauseTrack,
	playPauseIcon,
}) => {

	const determineWhatToShow = () => {
		if (!isLoggedIn && isTherePreview) return <PlayPreviewBtn />
		if(!isLoggedIn) return <NoPreviewLoginBtn />
	}

	const PlayPreviewBtn = () => {
		return (
			<div className='playPauseBtnArea'>
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
				<label htmlFor={`playPauseButton-${spotifyId}`}>Play Preview</label>
			</div>
		)
	}

	const NoPreviewLoginBtn = () => {
		return (
			<div className='spotifyLoginArea'>
				<span className='previewNotAvailableMsg'>
					Preview not available.
				</span>
				<LogInButton authCreds={authCreds} />
			</div>
		)
	}

	return determineWhatToShow()
}

export default PlayOrLogin
