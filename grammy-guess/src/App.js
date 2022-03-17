import {useEffect, useState} from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import AwardsPage from './templates/AwardsPage'
import { Routes, Route } from 'react-router-dom'
import Home from './templates/Home'
import AboutPage from './templates/AboutPage'

function App() {

  // const currentAwardName = 'Best Rap Song'
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
      <Header />
      <Sidebar token={token} authCreds={authCreds} logout={logout}/>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/award/:awardName' element={<AwardsPage token={token}/>} />
        </Routes>
        {/* <AwardsPage token={token} authCreds={authCreds} currentAwardName={currentAwardName} /> */}
      </main>
    </>
  );
}

export default App;
