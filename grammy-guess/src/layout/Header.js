import { Link } from 'react-router-dom'

const Header = () => {
	return (
		<header>
			<Link to='/'>
				<img
					src='../64th-grammy-black.svg'
					alt="'64th Grammys' in writing"
					className='logoAwardEdition'
				/>
			</Link>
		</header>
	)
}

export default Header
