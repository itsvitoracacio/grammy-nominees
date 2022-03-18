import { useEffect, useState } from "react"
import axios from "axios"

const LoggedInAs = ({ userToken }) => {

  const [userName, setUserName] = useState('')

  const fetchUser = async () => {
    const { data } = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${userToken}`,
      }
    })

    setUserName(data.display_name)

  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <span>
      Logged in as: <span className="userName">{userName}</span>
    </span>
  )
}

export default LoggedInAs