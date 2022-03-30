import HeaderLogo from '../components/theme-sensitive/HeaderLogo'

const Header = ({ hasGuessed }) => {
	return (
		<header>
			<HeaderLogo hasGuessed={hasGuessed}/>
		</header>
	)
}

export default Header
