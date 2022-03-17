
const SpotifyLoginArea = ({ token, authCreds, logout, userName }) => {
  return (
    <>
      {!token ?
        <div className="spotifyLoginArea">
          <a
          className='loginBtn'
          href={`${authCreds.AUTH_ENDPOINT}?client_id=${authCreds.CLIENT_ID}&redirect_uri=${authCreds.REDIRECT_URI}&response_type=${authCreds.RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
          <span className='belowLoginMsg'>to listen to the nominees<br />and vote!</span>
        </div> :
        <div className="spotifyLoginArea">
          <span>Logged in as: <span className="userName">{userName}</span></span>
          <a className='logoutBtn' onClick={logout}>Click Here to Logout</a>
        </div>
      }
    </>
  )
}

export default SpotifyLoginArea