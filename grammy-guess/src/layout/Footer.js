import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<footer>
			<p>
				<span>
					<Link to='/about'>
						click here to learn more about this project built by a couple of
						smart, elegant, funny, and humble individuals.
					</Link>
				</span>
				<span>
					this website is not affiliated with The Grammy Awards, the Recording
					Academy, Spotify or any of their partners and sponsors.
				</span>
			</p>
		</footer>
	)
}

export default Footer
