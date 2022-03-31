import { useState, useEffect } from 'react'
import axios from 'axios'
import PlayOrLogin from './PlayOrLogin'

const Nominee = ({
	eachAward,
	eachNominee,
	isLoggedIn,
	token,
	authCreds,
	guessUnguess2,
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
	const [fullUriFromSpotify, setFullUriFromSpotify] = useState('') // API doesn't provide full URL!!!

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
		// console.dir(data)
		const { name, artists, album, images, uri, preview_url } = data

		const allArtistsNamesArr = []
		artists.forEach(artist => allArtistsNamesArr.push(artist.name))
		const allAristsNamesStr = allArtistsNamesArr.join(', ')

		setNomineeNameFromSpotify(name)
		setArtistNameFromSpotify(artists[0].name)
		setAllArtistsFromSpotify(allAristsNamesStr)
		setFullUriFromSpotify(uri)
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

	// This block will need to change now that we know there's no full track URL provided
	let audioFile
	isLoggedIn
		? (audioFile = fullUriFromSpotify)
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
			setPlayPauseIcon('►|') // Change this to a fa-icon
		} else {
			nomineeTrack.pause()
			playPauseBtn.dataset.playing = 'false'
			setPlayPauseIcon('►') // Change this to a fa-icon
		}
	}

	const VoteBtn = () => {
		return (
			<>
				<button
					className='voteBtn'
					id={`voteBtn-${spotifyId}`}
					value={spotifyId}
					data-nominee-name={nomineeNameFromSpotify}
					data-artists-list={allArtistsFromSpotify}
					data-nominee-img={nomineeBigImgFromSpotify}
					onClick={guessUnguess2} // This function is declared on the App component
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
					<label htmlFor={`voteBtn-${spotifyId}`}>
						<img
							width='200px'
							className='nomineeImg'
							src={nomineeThumbFromSpotify}
							alt={altText}
						/>
					</label>
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
					{<PlayOrLogin
						isLoggedIn={isLoggedIn}
						isTherePreview={isTherePreview}
						authCreds={authCreds}
						token={token}
						spotifyId={spotifyId}
						playPauseTrack={playPauseTrack}
						playPauseIcon={playPauseIcon}
						playableUri={fullUriFromSpotify ? [fullUriFromSpotify] : []}
					/>}
				</div>
			</div>
		)
	}

	return <>{renderNominee()}</>
}

export default Nominee
