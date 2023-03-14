import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/loggedUsersReducer'
import { Button, TextField, Typography } from '@mui/material'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async event => {
    event.preventDefault()

    try {
      await dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
      navigate('/')
    } catch (e) {
      dispatch(
        setNotification({
          isError: true,
          content: 'Unable to log in'
        })
      )
      console.error('Wrong Credentials', e)
    }
  }

  const inputStyle = {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    margin: '5px 10px'
  }

  const textSyle = {
    display: 'flex',
    minWidth: '150px'
  }

  return (
    <div style={{ padding: 10 }}>
      <Typography variant="h4">Login in to aplication</Typography>
      <form onSubmit={handleLogin}>
        <div style={inputStyle}>
          <Typography sx={textSyle}>Username </Typography>
          <TextField
            sx={{ flex: 1 }}
            size="small"
            id="username"
            type="text"
            value={username}
            name="Username"
            placeholder="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div style={inputStyle}>
          <Typography sx={textSyle}>Password </Typography>
          <TextField
            sx={{ flex: 1 }}
            size="small"
            id="password"
            type="password"
            value={password}
            name="Password"
            placeholder="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button variant="contained" id="loginButton" type="submit">
          LOGIN
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
