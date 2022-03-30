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
		const selectedTheme = AwardsPageThemes.find(
			theme => theme.hasGuessed === hasGuessed
		)
		// Deconstructing the obj to grab headerLogoSrc as its own variable
		const { headerLogoSrc } = selectedTheme

		return (
			<img
				src={headerLogoSrc}
				alt="'64th Grammys' in writing"
				className='logoAwardEdition'
			/>
		)
	}

	return (
		<>
			<Link to='/'>{renderHeaderLogo()}</Link>
		</>
	)
}

export default HeaderLogo
