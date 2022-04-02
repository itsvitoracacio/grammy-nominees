import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

const PlayOrLogin = ({
	isTherePreview,
	spotifyId,
	playPauseIcon,
	fullUrlFromSpotify,
	playPauseAudio
}) => {
	const playPreviewHereOrFullOnSpotify = () => {
		if (isTherePreview) return <PlayPreviewBtn />
		else return <ListenOnSpotify />
	}

	const PlayPreviewBtn = () => {
		const iconToShow = () => {
			if (playPauseIcon === 'play') <FontAwesomeIcon icon={faPlay} />
			if (playPauseIcon === 'pause') <FontAwesomeIcon icon={faPause} />
		}

		return (
			<div className='playPauseBtnArea'>
				<button
					data-playing={false}
					role='switch'
					aria-checked='false'
					onClick={playPauseAudio}
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
