import {useEffect, useState} from 'react'
import Header from './components/Header'
import NomineeList from './components/NomineeList'
import Nav from './components/Nav'
import Vote from './components/Vote'

function App() {
  const currentAwardName = 'Best Rap Song'
  // const currentAwardName = 'Record of the Year'

  const authCreds = {
    CLIENT_ID: '9d34d6d2667e4f77b6d15e8e468091d6',
    REDIRECT_URI: 'http://localhost:3000',
    AUTH_ENDPOINT: 'https://accounts.spotify.com/authorize',
    RESPONSE_TYPE: 'token'
  }

  const [token, setToken] = useState('')

  useEffect( () => {
    const hash = window.location.hash
    let token = window.localStorage.getItem('token')

    if(!token && hash) {
      token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1]

      window.location.hash = ''
      window.localStorage.setItem('token', token)  
    }
    
    setToken(token)

  }, [])

  const logout = () => {
    setToken('')
    window.localStorage.removeItem('token')
  }

  return (
    <>
      <Header currentAwardName={currentAwardName}/>
      {!token ?
        <a className='loginBtn' href={`${authCreds.AUTH_ENDPOINT}?client_id=${authCreds.CLIENT_ID}&redirect_uri=${authCreds.REDIRECT_URI}&response_type=${authCreds.RESPONSE_TYPE}`}>Login to Spotify</a> :
        <button className='logoutBtn' onClick={logout}>Logout</button>}

      <Nav />
      <main>
        <NomineeList  currentAwardName={currentAwardName} token={token}/>
        <Vote currentAwardName={currentAwardName} token={token} authCreds={authCreds}/>
      </main>
    </>
  );
}

export default App;
