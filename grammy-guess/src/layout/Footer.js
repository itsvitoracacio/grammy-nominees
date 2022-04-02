import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<footer>
			<p>
				<Link to='/about'>
					click here to learn more about this project.
				</Link>
				this website does not store any data from you.
			</p>
		</footer>
	)
}

export default Footer
