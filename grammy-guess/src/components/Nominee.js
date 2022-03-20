import { useState, useEffect } from 'react'
import axios from 'axios'

const Nominee = ({ eachAward, eachNominee, clientToken, userToken, authCreds }) => {
	// console.log(token)

	const { awardTarget } = eachAward
	const { nomineeName, nomineeArtistName } = eachNominee
	const altText = `${nomineeArtistName}'s ${nomineeName}`

	const [nomineeNameFromSpotify, setNomineeNameFromSpotify] = useState('')
	const [artistNameFromSpotify, setArtistNameFromSpotify] = useState('')
	const [nomineeThumbFromSpotify, setNomineeThumbFromSpotify] = useState('')
	const [nomineeBigImgFromSpotify, setNomineeBigImgFromSpotify] = useState('')
	const [previewUrlFromSpotify, setPreviewUrlFromSpotify] = useState('')

	let isLoggedIn = userToken
	let token
	isLoggedIn ? (token = userToken) : (token = clientToken)

	const fetchNominee = async () => {
		const { data } = await axios.get('https://api.spotify.com/v1/search', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: {
				q: nomineeName,
				artist: nomineeArtistName,
				type: awardTarget,
			},
		})

		const searchResults = data.tracks.items
		const match1 = () => searchResults.find(item => item.name === nomineeName)
		const match2 = () => {
			return searchResults.find(item => item.name.includes(nomineeName))
		}

		let resultMatchingNominee
		if (match1()) resultMatchingNominee = match1()
		else resultMatchingNominee = match2()

		const { name, artists, album, href, preview_url } = resultMatchingNominee

		setNomineeNameFromSpotify(name)
		setArtistNameFromSpotify(artists[0].name)
		setNomineeThumbFromSpotify(album.images[1].url)
		setNomineeBigImgFromSpotify(album.images[0].url)
		setPreviewUrlFromSpotify(preview_url)
	}

	useEffect(() => {
		fetchNominee()
	}, [])

	const renderNominee = () => {

		// document.querySelector('#nomineeImg').addEventListener('mouseover', changeBodyBgImg(nomineeBigImgFromSpotify))

		// const changeBodyBgImg = nomineeImg => body.style.backgroundImage = nomineeImg

		return (
			<div className='nominee'>
				<img
					className='nomineeImg'
					id='nomineeImg'
					width='225px'
					src={nomineeThumbFromSpotify}
					alt={altText}
				/>
				<span className='nomineeName'>{nomineeNameFromSpotify}</span>
				<a className='artistName'>{artistNameFromSpotify}</a>
			</div>
		)
	}

	return <>{renderNominee()}</>
}

export default Nominee
