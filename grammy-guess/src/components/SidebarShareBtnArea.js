import { Link } from 'react-router-dom'

const SidebarShareBtnArea = () => {
	return (
		<>
			<div className='shareGuessesSidebarArea'>
				<span>When you're ready:</span>
				<Link to={'/share-your-guesses'} className='shareBtn'>
					Share Your Guesses
				</Link>
			</div>
		</>
	)
}

export default SidebarShareBtnArea
