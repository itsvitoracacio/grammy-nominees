import { Link } from 'react-router-dom'
import AllAwards from '../extra/AllAwards'

const Nav = () => {
	return (
		<nav>
			<ul className='awardsList'>
				{AllAwards.map(category => {
					return (
						<>
							<span>{category.categoryName}</span>

							{category.categoryAwards.map(award => {
								const categoryNameUrl = category.categoryName
									.replaceAll(' ', '-')
									.replaceAll('/', '-')
								const awardNameUrl = award.awardName
									.replaceAll(' ', '-')
									.replaceAll('/', '-')

								return (
									<li key={award.awardName}>
										<Link to={`/${categoryNameUrl}/${awardNameUrl}`}>
											{award.awardName}
										</Link>
										<span id={awardNameUrl}></span>
									</li>
								)
							})}
						</>
					)
				})}
			</ul>
		</nav>
	)
}

export default Nav
