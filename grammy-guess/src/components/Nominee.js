import { useState, useEffect } from 'react'
import axios from 'axios'

const Nominee = ({ eachAward, eachNominee, clientToken, userToken }) => {
	// console.log(token)

	const { awardTarget } = eachAward
	const { nomineeName, nomineeArtistName } = eachNominee
	const altText = `${nomineeArtistName}'s ${nomineeName}`

	const [nomineeNameFromSpotify, setNomineeNameFromSpotify] = useState('')
	const [artistNameFromSpotify, setArtistNameFromSpotify] = useState('')
	const [nomineeImgFromSpotify, setNomineeImgFromSpotify] = useState('')

	const token = clientToken

	let nomineeType = ''
	if (awardTarget === 'performance') nomineeType = 'track'
	if (awardTarget === 'notes') nomineeType = 'album'
	if (awardTarget !== 'performance' && awardTarget !== 'notes')
		nomineeType = awardTarget

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
		const match1 = searchResults.find(item => item.name === nomineeName)
		const match2 = () => {
			const secondTry = searchResults.find(item =>
				item.name.includes(nomineeName)
			)
			return secondTry
		}

		match1
			? console.log(
					match1.name,
					'\n',
					match1.artists[0].name,
					'vs',
					nomineeArtistName
			  )
			: console.log(
					'SECOND TRY: \n',
					match2().name,
					'\n',
					match2().artists[0].name,
					'vs',
					nomineeArtistName
			  )

		let resultMatchingNominee
		match1
			? (resultMatchingNominee = match1)
			: (resultMatchingNominee = match2())

		const { name, artists, album } = resultMatchingNominee

		setNomineeNameFromSpotify(name)
		setArtistNameFromSpotify(artists[0].name)
		setNomineeImgFromSpotify(album.images[1].url)
	}

	useEffect(() => {
		fetchNominee()
	}, [])

	const renderNominee = () => {
		return (
			<div className='nominee'>
				<img
					className='nomineeImg'
					width='225px'
					src={nomineeImgFromSpotify}
					alt={altText}
				/>
				<span className='nomineeName'>{nomineeNameFromSpotify}</span>
				<a className='artistName'>{artistNameFromSpotify}</a>
			</div>
		)
	}

	return (
		<>
			{/* <span>hey</span> */}
			{renderNominee()}
		</>
	)
}

export default Nominee
