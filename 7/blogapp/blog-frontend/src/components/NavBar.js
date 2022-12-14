import { Link } from 'react-router-dom'
import Login from './Login'

const NavBar = () => {
  const style = { padding: 5 }
  return (
    <div>
      <Link style={style} to="/">
        Home
      </Link>
      <Link style={style} to="/users">
        Users
      </Link>
      <Login style={style} />
    </div>
  )
}

export default NavBar
