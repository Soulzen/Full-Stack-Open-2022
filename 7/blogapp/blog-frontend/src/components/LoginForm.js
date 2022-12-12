import { useState } from 'react'

import loginService from '../services/login'
import blogsService from '../services/blogs'

const LoginForm = ({ updateUser, updateNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogsService.setToken(user.token)
      updateUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      updateNotification({
        isError: true,
        content: 'Unable to log in'
      })
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
