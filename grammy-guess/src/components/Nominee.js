import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const Nominee = ({
	eachAward,
	eachNominee,
	isLoggedIn,
	token,
	authCreds
}) => {
	// console.log(token)

	

	const { awardTarget } = eachAward
	const { nomineeName, nomineeArtistName, spotifyId } = eachNominee
	const altText = `${nomineeArtistName}'s ${nomineeName}`

	let apiCallObj = ''
	if (awardTarget === 'track' || awardTarget === 'performance')
		apiCallObj = 'tracks'
	if (awardTarget === 'album' || awardTarget === 'notes') apiCallObj = 'albums'
	if (awardTarget === 'artist') apiCallObj = 'artists'
	if (awardTarget === 'film/video') apiCallObj = 'film/video'
	if (awardTarget === 'producer') apiCallObj = 'producer'

	const [nomineeNameFromSpotify, setNomineeNameFromSpotify] = useState('')
	const [artistNameFromSpotify, setArtistNameFromSpotify] = useState('')
	const [nomineeThumbFromSpotify, setNomineeThumbFromSpotify] = useState('')
	const [nomineeBigImgFromSpotify, setNomineeBigImgFromSpotify] = useState('')
	const [previewUrlFromSpotify, setPreviewUrlFromSpotify] = useState('')
	const [hasPreview, setHasPreview] = useState(false)
	const [fullUrlFromSpotify, setFullUrlFromSpotify] = useState('')

	const fetchNominee = async () => {
		const { data } = await axios.get(
			`https://api.spotify.com/v1/${apiCallObj}/${spotifyId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		
		console.log(data);
		const { name, artists, album, images, href, preview_url } = data

		setNomineeNameFromSpotify(name)
		setArtistNameFromSpotify(artists[0].name)

		switch(apiCallObj) {
			case 'tracks':
				setNomineeThumbFromSpotify(album.images[1].url)
				setNomineeBigImgFromSpotify(album.images[0].url)
				break
			case 'albums':
				setNomineeThumbFromSpotify(images[1].url)
				setNomineeBigImgFromSpotify(images[0].url)
				break
			case 'artists':
				break
			case 'film/video':
				break
			case 'producers':
				break
		}
		if (apiCallObj === 'tracks') {
			setNomineeThumbFromSpotify(album.images[1].url)
			setNomineeBigImgFromSpotify(album.images[0].url)
		}
		if (apiCallObj === 'albums') {
			
		}

		
		// setFullUrlFromSpotify(href)
		// setPreviewUrlFromSpotify(preview_url)
		setFullUrlFromSpotify('./hotline-bling.mp3')
		setPreviewUrlFromSpotify('./hotline-bling.mp3')
		if (preview_url) setHasPreview(true)
	}

	useEffect(() => {
		fetchNominee()
	}, [])

	let actx
	let nomineeTrack
	let track
	const loadTrack = () => {
		if (actx != undefined) return
		else {
			actx = new AudioContext()
			nomineeTrack = document.querySelector(`#track-${spotifyId}`)
			track = actx.createMediaElementSource(nomineeTrack)
			track.connect(actx.destination)
			console.log('Track loaded!')
		}
	}

	const playPauseTrack = () => {
		const playPauseBtn = document.querySelector('#playPauseButton')

		// check if context is in suspended state (autoplay policy)
		if (actx.state === 'suspended') actx.resume()

		// play or pause track depending on state
		if (playPauseBtn.dataset.playing === 'false') {
			nomineeTrack.play()
			playPauseBtn.dataset.playing = 'true'
		} else {
			nomineeTrack.pause()
			playPauseBtn.dataset.playing = 'false'
		}
	}

	const renderNominee = () => {
		return (
			<div className='nominee'>
				<div
					className='nomineeImg'
					id={`nomineeImg-${nomineeNameFromSpotify}`}
					onMouseEnter={loadTrack}
				>
					<img width='225px' src={nomineeThumbFromSpotify} alt={altText} />
					<audio
						src={fullUrlFromSpotify}
						type='audio/mpeg'
						id={`track-${spotifyId}`}
					></audio>
					<button
						data-playing='false'
						role='switch'
						aria-checked='false'
						onClick={playPauseTrack}
						id='playPauseButton'
					>
						Play/Pause
					</button>
				</div>
				<span className='nomineeName'>{nomineeNameFromSpotify}</span>
				<a className='artistName'>{artistNameFromSpotify}</a>
			</div>
		)
	}

	return <>{renderNominee()}</>
}

export default Nominee
