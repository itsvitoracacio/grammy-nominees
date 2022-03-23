import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import NomineeCardActions from './NomineeCardActions'

const Nominee = ({ eachAward, eachNominee, isLoggedIn, token, authCreds }) => {
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
					'Content-Type': 'audio/mpeg',
				},
			}
		)

		const { name, artists, album, images, href, preview_url } = data

		setNomineeNameFromSpotify(name)
		setArtistNameFromSpotify(artists[0].name)
		setFullUrlFromSpotify(href)
		setPreviewUrlFromSpotify(preview_url)

		switch (apiCallObj) {
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
	}

	useEffect(() => {
		fetchNominee()
	}, [])

	/* useEffect(() => {
		console.log(`${nomineeNameFromSpotify} has preview: ${hasPreview}`, preview_url)
	}, [nomineeNameFromSpotify]) */

	const [trackIsLoaded, setTrackIsLoaded] = useState(false)

	let actx
	const nomineeTrack = document.querySelector(`#track-${spotifyId}`)
	let track
	const loadTrack = () => {
		// choosePlayTrackBtnOrNotAvailableMsg()
		// if (track.mediaElement != undefined) return
		if (trackIsLoaded == false) {
			actx = new AudioContext()
			// nomineeTrack = document.querySelector(`#track-${spotifyId}`)
			track = actx.createMediaElementSource(nomineeTrack)
			track.connect(actx.destination)
		}
	}

	const markTrackAsLoaded = () => {
		setTrackIsLoaded(true)
		console.log('Track loaded!')
		console.log(`Is logged in: ${isLoggedIn}`)
	}

	// const choosePlayTrackBtnOrNotAvailableMsg = () => {
	// 	if (previewUrlFromSpotify) console.log('oi')
	// }

	const [playPauseIcon, setPlayPauseIcon] = useState(' ►')
	const playPauseBtn = document.querySelector(`#playPauseButton-${spotifyId}`)

	const playPauseTrack = () => {
		// if (track != undefined) return
		// console.log(track);

		// check if context is in suspended state (autoplay policy)
		// if (actx.state === 'suspended') actx.resume()

		// play or pause track depending on state
		if (playPauseBtn.dataset.playing === 'false') {
			console.log(nomineeTrack)
			nomineeTrack.play()
			playPauseBtn.dataset.playing = 'true'
			setPlayPauseIcon('||')
		} else {
			console.log(nomineeTrack)
			nomineeTrack.pause()
			playPauseBtn.dataset.playing = 'false'
			setPlayPauseIcon(' ►')
		}
	}

	// console.log(authCreds)

	const renderNominee = () => {
		return (
			<div className='nominee'>
				<div
					className='nomineeImgArea'
					// id={`nomineeImg-${nomineeNameFromSpotify}`}
					onMouseEnter={loadTrack}
					onMouseLeave={markTrackAsLoaded}
				>
					<img
						width='225px'
						className='nomineeImg'
						src={nomineeThumbFromSpotify}
						alt={altText}
					/>
					<audio
						src={previewUrlFromSpotify}
						crossOrigin='anonymous'
						type='audio/mpeg'
						id={`track-${spotifyId}`}
					></audio>
					<div className='playAndVoteButtonArea'>
						{/* <button
							data-playing='false'
							role='switch'
							aria-checked='false'
							onClick={playPauseTrack}
							id={`playPauseButton-${spotifyId}`}
							className='playPauseBtn'
						>
							{playPauseIcon}
						</button>
						<span>Vote:</span>
						<button className='spotifyBtn voteBtn'>This is the winner!</button> */}
						<NomineeCardActions
							isLoggedIn={isLoggedIn}
							previewUrlFromSpotify={previewUrlFromSpotify}
							fullUrlFromSpotify={fullUrlFromSpotify}
							authCreds={authCreds}
							spotifyId={spotifyId}
							playPauseTrack={playPauseTrack}
							playPauseIcon={playPauseIcon}
						/>
					</div>
				</div>
				<span className='nomineeName'>{nomineeNameFromSpotify}</span>
				<a className='artistName'>{artistNameFromSpotify}</a>
			</div>
		)
	}

	return <>{renderNominee()}</>
}

export default Nominee
