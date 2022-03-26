const UserWinner = ({ guess }) => {
	const { guessingFor, nomineeChoice } = guess

	let artistToShare = ''
	/* if (artists.length === 1) {
    artistToShare = artists[0].name
  }
  else {
    nomineeChoice.artists.forEach(artist => {
      artistToShare.push(artist.name + ', ')
    })
    artistToShare = artistToShare.slice(0,-2)
  } */

	return (
		<div className='shareWinner'>
			<div className='shareCategory'>
				<span>{guessingFor}</span>
			</div>
			<div className='shareWork'>
				<span>{nomineeChoice}</span>
			</div>
			<div className='shareArtist'>
				<span>{artistToShare}</span>
			</div>
		</div>
	)
}

export default UserWinner
