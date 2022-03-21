import { Link } from 'react-router-dom'
import AllAwards from '../extra/AllAwards'

const Nav = () => {
  return (
    <nav>

      {AllAwards.map(category => {

        return (
          <ul className='awardsList' key={category.categoryName}>
            <label>{category.categoryName}</label>

            {category.categoryAwards.map(award => {

              const categoryNameUrl = category.categoryName.replaceAll(' ','-').replaceAll('/','-')
              const awardNameUrl = award.awardName.replaceAll(' ','-').replaceAll('/','-')

              // console.log(award.awardName)
              return (
                
                <li key={award.awardName}><Link to={`/${categoryNameUrl}/${awardNameUrl}`}>{award.awardName}</Link></li>
                
              )
            })}
            

          </ul>
        )
      })}

    </nav>
  )
}

export default Nav