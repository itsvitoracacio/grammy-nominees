const AboutPage = ({ renderGuessConfirmation }) => {
  renderGuessConfirmation()
  return (
    <>
      <h1>What exactly is this website?</h1>
      <section className="textPage">
      
        <p>This web app is an experimental, independent & non-commercial project made by <a href="https://twitter.com/itsvitoracacio" target="blank">Vitor</a> and <a href="https://twitter.com/edulopeso" target="blank">Eduardo</a>.</p>

        <p>We're both software engineers and long time friends. As awards season was approaching, we thought about all the hoops we usually have to jump through to listen to the Grammys nominees. It shouldn't really be that hard! So we decided to put our web development skills to practice, and the result is this little game.</p>

        <p>The technologies we used for this project are HTML, CSS, JavaScript, React.js, the Spotify API and, of course, lots of love (which is the hardest of them to learn). The idea was to create an app that could not only get us some coding practice to review the things we already know, but also push us to explore things we didn’t know yet. We ended up being able to train our developer muscles while building an app that would help people get to know new artists, explore the Grammy Awards' categories and listen to good music.</p>

        <p>So we hope you enjoy playing and guessing half as much as we enjoyed building this for you. And if you want to get in touch, we're on twitter almost every day, just click on our names above.</p>

        <p>See ya.</p>

      </section>
    </>
  )
}

export default AboutPage