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

              return (
                
                <li key={award.awardName}><Link to={`/award/${award.awardName}`}>{award.awardName}</Link></li>
                
              )
            })}
            

          </ul>
        )
      })}

    </nav>
  )
}

export default Nav