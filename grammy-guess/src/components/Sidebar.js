import SpotifyLoginArea from './SpotifyLoginArea'
import Nav from './Nav'
import ShareOnSocialArea from './ShareOnSocialArea'
import { Link } from 'react-router-dom'


const Sidebar = ({ token, authCreds, logout, userName }) => {

  // console.log(token)

  return (
    <>
      <input type='checkbox' className='sidebarToggle' id='sidebarToggle'/>
      <label htmlFor='sidebarToggle' className="sidebarOpenBtn">view awards list</label>
      <div className='sidebar'>
        <Link to='/'><img className='sidebarLogo' src='./sidebar-logo.svg'/></Link>
        <Link to='/about'>About Page</Link>
        <SpotifyLoginArea token={token} authCreds={authCreds} logout={logout} userName={userName}/>
        <Nav />
        <ShareOnSocialArea token={token}/>
        <img className='sidebarCloseBtn' src=''/>
      </div>
    </>
  )
}

export default Sidebar