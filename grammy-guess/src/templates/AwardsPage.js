// import NomineeList from '../components/NomineeList'
// import Vote from '../components/Vote'
// import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NomineeList from '../components/NomineeList'

const AwardsPage = ({ token }) => {

  // const [isLoading, setIsLoading] = useState(true)

  
  const { awardName } = useParams()


  return (
    <>
      <h1>{awardName}</h1>
      <NomineeList awardName={awardName} token={token}/>
    </>
  )




  // console.log(token)

  // return (
  //   <>
  //     <NomineeList  currentAwardName={currentAwardName} token={token}/>
  //     <Vote currentAwardName={currentAwardName} token={token} authCreds={authCreds}/>
  //   </>
  // )
}

export default AwardsPage