import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import NomineeCardActions from './NomineeCardActions'

const Nominee = ({
	eachAward,
	eachNominee,
	isLoggedIn,
	token,
	authCreds /* , userGuesses */,
	guessesCount,
	guessUnguess,
}) => {
	const { awardTarget, awardName } = eachAward
	const { nomineeName, nomineeArtistName, spotifyId } = eachNominee
	const altText = `${nomineeArtistName}'s ${nomineeName}` // Need to write this differently for each case

	const [nomineeNameFromSpotify, setNomineeNameFromSpotify] = useState('')
	const [artistNameFromSpotify, setArtistNameFromSpotify] = useState('')
	const [allArtistsFromSpotify, setAllArtistsFromSpotify] = useState('')
	const [nomineeThumbFromSpotify, setNomineeThumbFromSpotify] = useState('')
	const [nomineeBigImgFromSpotify, setNomineeBigImgFromSpotify] = useState('')
	const [previewUrlFromSpotify, setPreviewUrlFromSpotify] = useState('')
	const [hasPreview, setHasPreview] = useState(false)
	const [fullUrlFromSpotify, setFullUrlFromSpotify] = useState('') // API doesn't provide full URL!!!

	const fetchNominee = async () => {
		const { data } = await axios.get(
			`https://api.spotify.com/v1/${awardTarget}/${spotifyId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'audio/mpeg',
				},
			}
		) /* .catch() */ //load placeholder img, name and artist name, all without nominee card

		const { name, artists, album, images, href, preview_url } = data

		const allArtistsNamesArr = []
		artists.forEach(artist => allArtistsNamesArr.push(artist.name))
		const allAristsNamesStr = allArtistsNamesArr.join(', ')

		setNomineeNameFromSpotify(name)
		setArtistNameFromSpotify(artists[0].name)
		setAllArtistsFromSpotify(allAristsNamesStr)
		setFullUrlFromSpotify(href)
		setPreviewUrlFromSpotify(preview_url)

		switch (awardTarget) {
			case 'tracks':
				setNomineeThumbFromSpotify(album.images[1].url)
				setNomineeBigImgFromSpotify(album.images[0].url)
				break
			case 'albums':
				setNomineeThumbFromSpotify(images[1].url)
				setNomineeBigImgFromSpotify(images[0].url)
				break
			case 'artists':
				// yet to be specified
				break
			case 'film/video':
				// yet to be specified
				break
			case 'producers':
				// yet to be specified
				break
		}
	}

	useEffect(() => {
		fetchNominee()
	}, [])

	/* useEffect(() => {
		console.log(`${nomineeNameFromSpotify} has preview: ${hasPreview}`, preview_url)
	}, [nomineeNameFromSpotify]) */

	// This block will need to change now that we know there's no full track URL provided
	let audioFile
	isLoggedIn
		? (audioFile = fullUrlFromSpotify)
		: (audioFile = previewUrlFromSpotify)
	let isTherePreview
	previewUrlFromSpotify ? (isTherePreview = true) : (isTherePreview = false)

	// Loading the track to the page with the Web Audio API
	const [trackIsLoaded, setTrackIsLoaded] = useState(false)
	let actx
	const nomineeTrack = document.querySelector(`#track-${spotifyId}`)
	let track
	const loadTrack = () => {
		if (trackIsLoaded == false) {
			actx = new AudioContext()
			track = actx.createMediaElementSource(nomineeTrack)
			track.connect(actx.destination)
		}
	}

	const markTrackAsLoaded = () => {
		setTrackIsLoaded(true)
	}

	const [playPauseIcon, setPlayPauseIcon] = useState('►') // Change this for a fa-icon
	const playPauseBtn = document.querySelector(`#playPauseButton-${spotifyId}`)

	const playPauseTrack = () => {
		// play or pause track depending on state
		if (playPauseBtn.dataset.playing === 'false') {
			nomineeTrack.play()
			playPauseBtn.dataset.playing = 'true'
			setPlayPauseIcon('►|') // Change this for a fa-icon
		} else {
			nomineeTrack.pause()
			playPauseBtn.dataset.playing = 'false'
			setPlayPauseIcon('►') // Change this for a fa-icon
		}
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
					This is the winner!
				</button>
			</>
		)
	}

	const renderNominee = () => {
		return (
			<div className='nominee'>
				<VoteBtn />
				<div
					className='nomineeImgArea'
					width='188px' // Find a way to make this be a square even when the image doesn't load
					height='188px'
					onMouseEnter={loadTrack}
					onMouseLeave={markTrackAsLoaded}
				>
					<img
						width='200px'
						className='nomineeImg'
						src={nomineeThumbFromSpotify}
						alt={altText}
					/>
					<audio
						src={audioFile}
						crossOrigin='anonymous'
						type='audio/mpeg'
						id={`track-${spotifyId}`}
					></audio>
				</div>
				<div className='nomineeCardBottom'>
					<span className='nomineeName'>{nomineeNameFromSpotify}</span>
					<span className='artistName'>{artistNameFromSpotify}</span>
					<div className='playAndVoteButtonArea'>
						<NomineeCardActions
							isLoggedIn={isLoggedIn}
							isTherePreview={isTherePreview}
							authCreds={authCreds}
							awardName={awardName}
							spotifyId={spotifyId}
							nomineeNameFromSpotify={nomineeNameFromSpotify}
							allArtistsFromSpotify={allArtistsFromSpotify}
							nomineeBigImgFromSpotify={nomineeBigImgFromSpotify}
							guessesCount={guessesCount}
							guessUnguess={guessUnguess}
							playPauseTrack={playPauseTrack}
							playPauseIcon={playPauseIcon}
							audioFile={audioFile}
						/>
					</div>
				</div>
			</div>
		)
	}

	return <>{renderNominee()}</>
}

export default Nominee
