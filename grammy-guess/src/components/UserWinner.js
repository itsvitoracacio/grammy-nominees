const UserWinner = ({ guess }) => {
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
				<span>{guess.guessingFor}</span>
			</div>
			<div className='shareWork'>
				<span>{guess.nomineeChoiceName}</span>
			</div>
			<div className='shareArtist'>
				<span>{guess.nomineeChoiceArtists}</span>
			</div>
		</div>
	)
}

export default UserWinner
