import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AwardsPageThemes from '../../extra/AwardsPageThemes'

const HeaderLogo = ({ hasGuessed }) => {
	// Rendering this component on page load, and then making it re-render each time the hasGuessed state is updated
	useEffect(() => {
		renderHeaderLogo()
	}, [hasGuessed])

	const renderHeaderLogo = () => {
		// Selecting the theme that matches the hasGuessed state each time this component gets rendered
		let selectedTheme
		if (document.body.clientWidth < 768 && hasGuessed === true) {
			selectedTheme = AwardsPageThemes.find(
				theme => theme.hasGuessed !== hasGuessed
			)
		} else {
			selectedTheme = AwardsPageThemes.find(
				theme => theme.hasGuessed === hasGuessed
			)
		}
		// Deconstructing the obj to grab headerLogoSrc as its own variable
		const { headerLogoSrc } = selectedTheme

		return (
			<Link to='/'>
				<img
					src={headerLogoSrc}
					alt="'64th Grammys' in writing"
					className='logoAwardEdition'
				/>
			</Link>
		)
	}

	return renderHeaderLogo()
}

export default HeaderLogo
