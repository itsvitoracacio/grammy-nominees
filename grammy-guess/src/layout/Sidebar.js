import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SidebarShareBtnArea from '../components/SidebarShareBtnArea'
import Nav from '../components/Nav'

const Sidebar = ({ renderGuessConfirmation }) => {

	useEffect(() => {
    // closeSidebar()
		renderGuessConfirmation()
  }, [])

	return (
		<>
			<input type='checkbox' className='sidebarToggle' id='sidebarToggle' />
			<label htmlFor='sidebarToggle' className='sidebarOpenBtn'>
				view awards list
			</label>
			<div className='sidebar'>
				<Link to='/'>
					<img className='sidebarLogo' src='../sidebar-logo.svg' />
				</Link>
				<SidebarShareBtnArea />
				<Nav />
			</div>
		</>
	)
}

export default Sidebar
