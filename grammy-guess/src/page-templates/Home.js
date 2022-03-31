const Home = ({ renderGuessConfirmationToUser }) => {
  // renderGuessConfirmationToUser()
  return (
    <>
      <h1>Guess The Winners!</h1>
      <section className="textPage">
        <p>Wanna know who are this year's nominees? Show you're a music expert. Guess who will win!</p>

        <ul>
          <li>
            <span>discover</span>
            <span>browse through every category, and listen to the nominees work</span>
          </li>
          <li>
            <span>guess</span>
            <span>choose who are your favorites for winning each award</span>
          </li>
          <li>
            <span>share</span>
            <span>share your guesses and compare them with your friends'</span>
          </li>
        </ul>

        <p>Welcome to the 2022 Grammys edition of 'Guess The Winners!'</p>
          
        <p>Have fun with it!</p>

        <p>All the pictures and audio were provided by Spotify. So if you choose to log in with your Spotify account, you can listen to the nominees full work. If you don't, it's alright — there's a 30 second preview available for most of them!</p>

        <p>We're not affiliated in any way with Spotify, the Grammys, The Recording Academy, or any of their partners.</p>
      </section>
    </>
  )
}

export default Home