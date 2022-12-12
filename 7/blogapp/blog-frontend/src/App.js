import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Home from './components/Home'

import { loadStoredUser } from './reducers/loggedUsersReducer'
import UserList from './components/UsersList'

const App = () => {
  const user = useSelector(({ loggedUser }) => loggedUser)
  const dispatch = useDispatch()

  const notification = useSelector(({ notification }) => notification)

  useEffect(() => {
    dispatch(loadStoredUser())
  }, [])

  return (
    <div>
      <h1>BLOGS</h1>
      <Notification message={notification} />
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate replace to="/login" />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </div>
  )
}

export default App
