import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppBar, Toolbar, Button } from '@mui/material'

import Login from './Login'

const NavBar = () => {
  const storedUser = useSelector(({ loggedUser }) => loggedUser)
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Button
            color="inherit"
            component={Link}
            to="/"
          >
            HOME
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/users"
          >
            USERS
          </Button>
        </div>
        {storedUser ? <Login /> : null}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
