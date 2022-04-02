import { useEffect } from "react"

const Home = ({ renderGuessConfirmation, closeSidebar }) => {
  
  useEffect(() => {
    closeSidebar()
    renderGuessConfirmation()
  }, [])
  // renderGuessConfirmation()

  return (
    <>
      <h1>Guess The Winners!</h1>
      <section className="textPage">
        <p>Wanna know who are this year's nominees? Show you're a music expert. Guess who will win!</p>

        <ul className="featureList">
          <li className="featureItem">
            <span className="featureName">discover</span>
            <span>browse through every category, and listen to the nominees work</span>
          </li>
          <li className="featureItem">
            <span className="featureName">guess</span>
            <span>choose who are your favorites for winning each award</span>
          </li>
          <li className="featureItem">
            <span className="featureName">share</span>
            <span>share your guesses and compare them with your friends'</span>
          </li>
        </ul>

        <p>Welcome to the 2022 Grammys edition of 'Guess The Winners!'</p>

        <p>All the pictures and audio were provided by Spotify. They allow for a small preview of some of the songs and albums featured here. For the ones they don't, there's a link for you to listen to the full thing directly on your Spotify app.</p>

        <p>We're not affiliated in any way with Spotify, the Grammys, The Recording Academy, or any of their partners.</p>
      </section>
    </>
  )
}

export default Home