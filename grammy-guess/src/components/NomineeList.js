import Awards from '../objects/Awards'
import Nominee from './Nominee'

const NomineeList = ({ currentAwardName, token }) => {

  // Check which of the category names appears in the award name of the current page
  let currentCategoryName
  Awards.forEach(cat => {
    void(currentAwardName.includes(cat.categoryName) && (currentCategoryName = cat.categoryName))
  })

  // Find the award object that corresponds to the current award page
  const currentCategory = Awards.find(cat => cat.categoryName === currentCategoryName)
  const currentAward = currentCategory.categoryAwards.find(award => award.awardName === currentAwardName)

  let nomineeListHtml=[]
  currentAward.awardNominees.forEach(currentNominee => {
    nomineeListHtml.push( <Nominee key={currentNominee.nomineeName} eachAward={currentAward} eachNominee={currentNominee} token={token}/> )
  })

  return (
    <section className='nomineeListSection'>

      {nomineeListHtml}

    </section>
  )
}

export default NomineeList