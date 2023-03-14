import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { loggout } from '../reducers/loggedUsersReducer'

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ loggedUser }) => loggedUser)
  return (
    <Typography>
      {user.name} logged in
      <Button
        color="inherit"
        variant="outlined"
        style={{ margin: 10, padding: '5px 10px' }}
        onClick={() => {
          dispatch(loggout())
        }}
      >
        Logout
      </Button>
    </Typography>
  )
}

export default Login
