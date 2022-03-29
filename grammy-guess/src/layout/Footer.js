import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<footer>
			<p>
				<span>
					<Link to='/about'>
						click here to learn more about this project.
					</Link>
				</span>
				<span>
					this website does not store any data from you.
				</span>
			</p>
		</footer>
	)
}

export default Footer
