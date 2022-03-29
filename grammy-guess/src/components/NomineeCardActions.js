import LogInButton from './LogInButton'
import { useState } from 'react'

const NomineeCardActions = ({
	isLoggedIn,
	isTherePreview,
	authCreds,
	awardName,
	// userGuesses,
	guessesCount,
	guessUnguess,
	spotifyId,
	nomineeNameFromSpotify,
	allArtistsFromSpotify,
	nomineeBigImgFromSpotify,
	playPauseTrack,
	playPauseIcon,
}) => {

	const determineWhatToShow = () => {
		if (isLoggedIn || isTherePreview) return <PlayAndVoteBtns />
		else return <NoPreviewLoginAndVoteBtns />
	}

	const PlayAndVoteBtns = () => {
		return (
			<>
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
			</>
		)
	}

	const NoPreviewLoginAndVoteBtns = () => {
		return (
			<>
				<div className='spotifyLoginArea'>
					<span className='previewNotAvailableMsg'>
						Preview not available.
					</span>
					<LogInButton authCreds={authCreds} />
				</div>
			</>
		)
	}

	const VoteBtn = () => {
		return (
			<>
				<button
					className='voteBtn'
					id='voteBtn'
					value={spotifyId}
					data-nominee-name={nomineeNameFromSpotify}
					data-artists-list={allArtistsFromSpotify}
					data-nominee-img={nomineeBigImgFromSpotify}
					onClick={guessUnguess} // This function is declared on the AwardsPage component
				>
					This is<br />the winner!
				</button>
			</>
		)
	}

	return determineWhatToShow()
}

export default NomineeCardActions
