import { Link } from 'react-router-dom'
import SpotifySidebarLogin from '../components/SpotifySidebarLogin'
import Nav from '../components/Nav'

const Sidebar = ({ userToken, authCreds, logout }) => {
	// console.log(token)

	return (
		<>
			<input type='checkbox' className='sidebarToggle' id='sidebarToggle' />
			<label htmlFor='sidebarToggle' className='sidebarOpenBtn'>
				view awards list
			</label>
			<div className='sidebar'>
				<Link to='/'>
					<img className='sidebarLogo' src='./sidebar-logo.svg' />
				</Link>
				<SpotifySidebarLogin
					userToken={userToken}
					authCreds={authCreds}
					logout={logout}
				/>
				<Nav />
				<img className='sidebarCloseBtn' src='' />
			</div>
		</>
	)
}

export default Sidebar
