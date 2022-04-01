const PlayOrLogin = ({
	isTherePreview,
	spotifyId,
	playPauseTrack,
	playPauseIcon,
	fullUrlFromSpotify,
}) => {
	const playPreviewHereOrFullOnSpotify = () => {
		if (isTherePreview) return <PlayPreviewBtn />
		else return <ListenOnSpotify />
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

	const ListenOnSpotify = () => {
		return (
			<div className='listenOnSpotifyArea'>
				<span className='previewNotAvailableMsg'>Preview not available.</span>
				<a href={fullUrlFromSpotify} target='_blank'>
					<img height='28px' src='./../spotify-icon-black.png' />
					<span>Play On Spotify</span>
				</a>
			</div>
		)
	}

	return playPreviewHereOrFullOnSpotify()
}

export default PlayOrLogin
