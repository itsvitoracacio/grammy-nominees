const Header = (props) => {
  const currentAwardName = 'Best Rap Album'

  return (
    <header>
      <img src="./64th-grammy.svg" alt="'64th Grammys' in writing" className="logoAwardEdition" />
      <h1>{currentAwardName}</h1>
    </header>
  )
}

export default Header