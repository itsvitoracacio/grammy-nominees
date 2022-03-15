const Vote = ({ currentAwardName, token, authCreds }) => {
  return (
    <>
      { !token ?
          <a className="voteBtn" href={`${authCreds.AUTH_ENDPOINT}?client_id=${authCreds.CLIENT_ID}&redirect_uri=${authCreds.REDIRECT_URI}&response_type=${authCreds.RESPONSE_TYPE}`}>Login to Spotify to Listen and Vote</a> :
          <span className="voteMsg">You voted for:</span>}
    </>
  )
}

export default Vote