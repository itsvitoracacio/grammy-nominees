import { useEffect } from 'react'
import AwardsPageThemes from '../../extra/AwardsPageThemes'

const AwardsPageHeader = ({ categoryName, hasGuessed }) => {
	// Rendering this component on page load, and then making it re-render each time the hasGuessed state is updated
	useEffect(() => {
		renderAwardsPageHeader()
	}, [hasGuessed])

	const renderAwardsPageHeader = () => {
		
		let h1ClassName
		if (document.body.clientWidth < 768) {
			h1ClassName = 'awardsPageElement-themeHasGuessed'
			// document.body.children[1].children[4].children[0].style.position = 'fixed'
			// document.body.children[1].children[4].children[1].style.position = 'fixed'
		} else {
			h1ClassName = `awardsPageElement-themeHasGuessed-${hasGuessed}`
			// document.body.children[1].children[4].children[0].style.position = 'absolute'
			// document.body.children[1].children[4].children[1].style.position = 'absolute'
		}

		// Selecting the theme that matches the hasGuessed state each time this component gets rendered
		const selectedTheme = AwardsPageThemes.find(
			theme => theme.hasGuessed === hasGuessed
		)
		// Deconstructing the obj to grab spotifyLogoSrc as its own variable
		const { spotifyLogoSrc } = selectedTheme

		return (
			<>
				<h1 className={h1ClassName}>
					{categoryName}
				</h1>
				<div className='apiCompliance'>
					<span className={`awardsPageElement-themeHasGuessed`}>
						All nominee info
						<br />
						is provided by
					</span>
					<img width='70px' height='21.16px' src={spotifyLogoSrc} />
				</div>
			</>
		)
	}

	return <>{renderAwardsPageHeader()}</>
}

export default AwardsPageHeader
