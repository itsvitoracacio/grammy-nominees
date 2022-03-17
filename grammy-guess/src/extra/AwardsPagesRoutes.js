/* import AllAwards from './AllAwards'
import { Route } from 'react-router-dom'


const AwardsPagesRoutes = () => {

  let AwardsRoutesList=[]
  AllAwards.forEach(category => {

    category.categoryAwards.forEach(award => {

      const path = `/${award}`
      AwardsPagesRoutes.push(<Route path={path}/>)

    })
  })


  return (
    <>
      {AwardsRoutesList}
    </>
  )
}

export default AwardsPagesRoutes */