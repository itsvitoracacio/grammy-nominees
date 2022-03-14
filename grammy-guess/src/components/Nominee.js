const Nominee = (props) => {

  const { imgShownType } = props.eachAward
  const { nomineeName, nomineeArtistName, nomineeImg } = props.eachNominee
  const altText = `${nomineeArtistName}'s ${nomineeName} ${imgShownType}`


  return (
    <div className="nominee">
      <img className="nomineeImg" width="225px" src={nomineeImg} alt={altText}/>
      <span className="nomineeName">{nomineeName}</span>
      <a className="artistName" >{nomineeArtistName}</a>
      {/* this needs to become a react link component */}
    </div>
  )
}

export default Nominee