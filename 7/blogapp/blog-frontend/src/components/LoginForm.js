import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/usersReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async event => {
    event.preventDefault()

    try {
      await dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
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

  return (
    <div>
      <h2>Login in to aplication</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="loginButton" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
