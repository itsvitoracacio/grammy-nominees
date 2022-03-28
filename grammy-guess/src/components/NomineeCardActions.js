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
				<VoteBtn />
			</>
		)
	}

	const NoPreviewLoginAndVoteBtns = () => {
		return (
			<>
				<div className='spotifyLoginArea'>
					<span className='previewNotAvailableMsg'>
						Preview not available.
						<br />
						To listen to the full thing:
					</span>
					<LogInButton authCreds={authCreds} />
					<span className='belowLoginMsg'>
						<br />
						or just vote:
					</span>
				</div>
				<VoteBtn />
			</>
		)
	}

	const VoteBtn = () => {
		return (
			<button
				className='spotifyBtn voteBtn'
				id='voteBtn'
				value={spotifyId}
				data-nominee-name={nomineeNameFromSpotify}
				data-artists-list={allArtistsFromSpotify}
				onClick={guessUnguess} // This function is declared on the AwardsPage component
			>
				This is the winner!
			</button>
		)
	}

	return determineWhatToShow()
}

export default NomineeCardActions
