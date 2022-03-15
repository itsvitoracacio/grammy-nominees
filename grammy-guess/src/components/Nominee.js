import axios from 'axios'
import {useState, useEffect} from 'react'

const Nominee = ({eachAward, eachNominee, token}) => {

  const { imgShownType, awardTarget } = eachAward
  const { nomineeName, nomineeArtistName } = eachNominee
  const altText = `${nomineeArtistName}'s ${nomineeName} ${imgShownType}`

  const [nomineeNameFromSpotify, setNomineeNameFromSpotify] = useState('')
  const [artistNameFromSpotify, setArtistNameFromSpotify] = useState('')
  const [nomineeImgFromSpotify, setNomineeImgFromSpotify] = useState('')

  const fetchNominee = async () => {

    const { data } = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: nomineeName,
        artist: nomineeArtistName,
        type: awardTarget
      }
    })

    const searchResults = data.tracks.items
    const resultMatchingNominee = searchResults.find(item => item.artists[0].name === nomineeArtistName)
    const { name, artists, album } = resultMatchingNominee

    setNomineeNameFromSpotify(name)
    setArtistNameFromSpotify(artists[0].name)
    setNomineeImgFromSpotify(album.images[1].url)
    
  }

  useEffect( () => {
    fetchNominee()
  }, [])

  const renderNominee = () => {

    return (
      <div className='nominee'>
        <img className="nomineeImg" width="225px" src={nomineeImgFromSpotify} alt={altText}/>
        <span className="nomineeName">{nomineeNameFromSpotify}</span>
        <a className="artistName" >{artistNameFromSpotify}</a>
      </div>

    )
  }

  return (
    <>
      {renderNominee()}
    </>
  )
}

export default Nominee