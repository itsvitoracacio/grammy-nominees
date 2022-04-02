import { useState, useEffect } from 'react'
import axios from 'axios'
import PlayOrLogin from './PlayOrLogin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

const Nominee = ({
	eachAward,
	eachNominee,
	clientToken,
	guessUnguess,
	closeSidebar,
}) => {
	const { awardTarget } = eachAward
	const { nomineeName, nomineeArtistName, spotifyId } = eachNominee
	const altText = `${nomineeArtistName}'s ${nomineeName}` // Need to write this differently for each case

	const [nomineeNameFromSpotify, setNomineeNameFromSpotify] = useState('')
	const [artistNameFromSpotify, setArtistNameFromSpotify] = useState('')
	const [allArtistsFromSpotify, setAllArtistsFromSpotify] = useState('')
	const [nomineeThumbFromSpotify, setNomineeThumbFromSpotify] = useState('')
	const [nomineeBigImgFromSpotify, setNomineeBigImgFromSpotify] = useState('')
	const [previewUrlFromSpotify, setPreviewUrlFromSpotify] = useState('')
	const [fullUrlFromSpotify, setFullUrlFromSpotify] = useState('')

	const fetchNominee = async () => {
		const { data } = await axios.get(
			`https://api.spotify.com/v1/${awardTarget}/${spotifyId}`,
			{
				headers: {
					Authorization: `Bearer ${clientToken}`,
					'Content-Type': 'audio/mpeg',
				},
			}
		) /* .catch() */ //load placeholder img, name and artist name, all without nominee card
		const { name, artists, album, images, external_urls, preview_url } = data

		const allArtistsNamesArr = []
		if (artists) {
			artists.forEach(artist => allArtistsNamesArr.push(artist.name))
			const allArtistsNamesStr = allArtistsNamesArr.join(', ')
			setAllArtistsFromSpotify(allArtistsNamesStr)
		}

		setNomineeNameFromSpotify(name)
		setFullUrlFromSpotify(external_urls.spotify)
		setPreviewUrlFromSpotify(preview_url)

		switch (awardTarget) {
			case 'tracks':
				setNomineeThumbFromSpotify(album.images[1].url)
				setNomineeBigImgFromSpotify(album.images[0].url)
				setArtistNameFromSpotify(artists[0].name)
				console.log('These are tracks')
				break
			case 'albums':
				setNomineeThumbFromSpotify(images[1].url)
				setNomineeBigImgFromSpotify(images[0].url)
				setArtistNameFromSpotify(artists[0].name)
				console.log('These are albums')
				break
			case 'artists':
				setNomineeThumbFromSpotify(images[1].url)
				setNomineeBigImgFromSpotify(images[0].url)
				console.dir(images)
				// yet to be specified
				console.log('These are artists')
				break
			case 'film/video':
				// yet to be specified
				break
			case 'producers':
				// yet to be specified
				break
			default:
				break
		}
	}

	useEffect(() => {
		fetchNominee()
		closeSidebar()
	}, [])

	// Storing the preview audio file in a variable to be loaded
	const audioFile = previewUrlFromSpotify
	// Determining if there's a preview audio file available for the work
	let isTherePreview
	previewUrlFromSpotify ? (isTherePreview = true) : (isTherePreview = false)

	// Loading the track to the page with the Web Audio API
	const [trackIsLoaded, setTrackIsLoaded] = useState(false)
	let actx
	let track
	const nomineeTrack = document.querySelector(`#track-${spotifyId}`)
	const loadTrack = () => {
		if (trackIsLoaded === false) {
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
	const [isPlaying, setIsPlaying] = useState(false)

	const playPauseAudio = () => {
		const songIsPlaying = isPlaying
		if (songIsPlaying === false) {
			nomineeTrack.play()
			setIsPlaying(true)
			setPlayPauseIcon('❚❚')
		}
		if (songIsPlaying === true) {
			nomineeTrack.pause()
			setIsPlaying(false)
			setPlayPauseIcon('►')
		}
	}

	const GuessBtn = () => {
		return (
			<>
				<button
					className='guessBtn'
					id={`guessBtn-${spotifyId}`}
					value={spotifyId}
					data-nominee-name={nomineeNameFromSpotify}
					data-artists-list={allArtistsFromSpotify}
					data-nominee-img={nomineeBigImgFromSpotify}
					onClick={guessUnguess} // This function is declared on the App component
				>
					This is the winner!
				</button>
			</>
		)
	}

	const renderNominee = () => {
		return (
			<div className='nominee'>
				<GuessBtn />
				<div
					className='nomineeImgArea'
					width='188px' // Find a way to make this be a square even when the image doesn't load
					height='188px'
					onMouseEnter={loadTrack}
					onMouseLeave={markTrackAsLoaded}
				>
					<label htmlFor={`guessBtn-${spotifyId}`}>
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
					{
						<PlayOrLogin
							isTherePreview={isTherePreview}
							spotifyId={spotifyId}
							playPauseIcon={playPauseIcon}
							fullUrlFromSpotify={fullUrlFromSpotify}
							playPauseAudio={playPauseAudio}
						/>
					}
				</div>
			</div>
		)
	}

	return <>{renderNominee()}</>
}

export default Nominee
