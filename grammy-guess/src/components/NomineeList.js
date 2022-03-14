import Awards from '../objects/Awards'
import Nominee from './Nominee'

const NomineeList = (props) => {

  // Check which of the category names appears in the award name of the current page
  let currentCategoryName
  Awards.forEach(cat => {
    void(props.currentAwardName.includes(cat.categoryName) && (currentCategoryName = cat.categoryName))
  })

  // Find the award object that corresponds to the current award page
  const currentCategory = Awards.find(cat => cat.categoryName === currentCategoryName)
  const currentAward = currentCategory.categoryAwards.find(award => award.awardName === props.currentAwardName)

  let nomineeListHtml=[]
  currentAward.awardNominees.forEach(currentNominee => {
    nomineeListHtml.push( <Nominee eachAward={currentAward} eachNominee={currentNominee} key={currentNominee.nomineeName}/> )
  })

  return (
    <main>

      {nomineeListHtml}

    </main>
  )
}

export default NomineeList