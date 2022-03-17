import AllAwards from '../extra/AllAwards'
import Nominee from './Nominee'

const NomineeList = ({ awardName, token }) => {

  // console.log(token)

  // Check which of the category names appears in the award name of the current page
  let currentCategoryName
  AllAwards.forEach(cat => {
    void(awardName.includes(cat.categoryName) && (currentCategoryName = cat.categoryName))
  })

  // Find the award object that corresponds to the current award page
  const currentCategory = AllAwards.find(cat => cat.categoryName === currentCategoryName)
  const currentAward = currentCategory.categoryAwards.find(award => award.awardName === awardName)

  let nomineeListJsx=[]
  currentAward.awardNominees.forEach(currentNominee => {
    nomineeListJsx.push( 
      <Nominee key={currentNominee.nomineeName} eachAward={currentAward} eachNominee={currentNominee} token={token}/>
    )
  })

  return (
    <section className='nomineeListSection'>

      {nomineeListJsx}

    </section>
  )
}

export default NomineeList