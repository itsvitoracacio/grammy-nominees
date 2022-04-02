import { Link } from 'react-router-dom'
const NotFound404 = () => {

  return (
    <>
      <h1>404: Not Found</h1>
      <section className="textPage">
        <p>Sorry, we couldn't find the page you were looking for. Please go back to the <Link to='/'>homepage</Link>.</p>
      </section>
    </>
  )
}

export default NotFound404