import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Navigate, useMatch } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'

import {
  NavBar,
  Notification,
  Home,
  LoginForm,
  UserList,
  User,
  Blog
} from './components'

import { loadStoredUser } from './reducers/loggedUsersReducer'
import { initializeUsers } from './reducers/usersReducer'
import { initializeBlogs } from './reducers/blogsReducer'

const App = () => {
  const dispatch = useDispatch()

  const loggedUser = useSelector(({ loggedUser }) => loggedUser)
  const notification = useSelector(({ notification }) => notification)
  const users = useSelector(({ users }) => users)
  const blogs = useSelector(({ blogs }) => blogs)

  useEffect(() => {
    dispatch(loadStoredUser())
    dispatch(initializeUsers())
    dispatch(initializeBlogs())
  }, [])

  const userMatch = useMatch('/users/:id')
  const user = userMatch ? users.find(u => u.id === userMatch.params.id) : null

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch ? blogs.find(b => b.id === blogMatch.params.id) : null

  return (
    <div>
      <CssBaseline />
      <NavBar />
      <Notification message={notification} />
      <Routes>
        <Route
          path="/"
          element={loggedUser ? <Home /> : <Navigate replace to="/login" />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User user={user} />} />
        <Route
          path="/blogs/:id"
          element={<Blog blog={blog} user={loggedUser} />}
        />
      </Routes>
    </div>
  )
}

export default App
