import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Navigate, useMatch } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Home from './components/Home'
import User from './components/User'
import UserList from './components/UsersList'
import Blog from './components/Blog'
import NavBar from './components/NavBar'

import { loadStoredUser } from './reducers/loggedUsersReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  const loggedUser = useSelector(({ loggedUser }) => loggedUser)
  const notification = useSelector(({ notification }) => notification)
  const users = useSelector(({ users }) => users)
  const blogs = useSelector(({ blogs }) => blogs)

  useEffect(() => {
    dispatch(loadStoredUser())
    dispatch(initializeUsers())
  }, [])

  const userMatch = useMatch('/users/:id')
  const user = userMatch ? users.find(u => u.id === userMatch.params.id) : null

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch ? blogs.find(b => b.id === blogMatch.params.id) : null

  return (
    <div>
      <NavBar />
      <h1>BLOGS</h1>
      <Notification message={notification} />
      <Routes>
        <Route path="/" element={loggedUser ? <Home /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User user={user} />} />
        <Route path="/blogs/:id" element={<Blog blog={blog} user={loggedUser} />} />
      </Routes>
    </div>
  )
}

export default App
