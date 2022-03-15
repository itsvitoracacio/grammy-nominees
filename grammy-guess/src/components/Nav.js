import { Link } from 'react-router-dom'
import SpotifyLoginArea from './SpotifyLoginArea'

const Nav = () => {
  return (
    <>
      <span className="navToggle">view awards</span>
      <div className='sidebar'>
        <img className='sidebarLogo'/>
        <SpotifyLoginArea />
        <ul>

        </ul>
        <ul>
          <span>Rap</span>
          <li></li>
        </ul>
      </div>
    </>
  )
}

export default Nav