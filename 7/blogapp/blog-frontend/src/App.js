import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Toggable'

import { initializeBlogs } from './reducers/blogsReducer'
import { loggout, loadStoredUser } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(({ blogs }) => blogs)

  const user = useSelector(({ user }) => user)

  const notification = useSelector(({ notification }) => notification)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(loadStoredUser())
  }, [dispatch])

  const sortedBlogs = [...blogs].sort((a, b) => {
    return b.likes - a.likes
  })

  return user === null ? (
    <>
      <Notification message={notification}></Notification>
      <LoginForm></LoginForm>
    </>
  ) : (
    <div>
      <h2>blogs</h2>
      <Notification message={notification}></Notification>
      <div>
        {user.name} logged in
        <button
          onClick={() => {
            dispatch(loggout())
          }}
        >
          Logout
        </button>
      </div>
      <Togglable buttonLabel="New Blog" /* ref={noteFormRef} */>
        <NewBlogForm></NewBlogForm>
      </Togglable>
      {sortedBlogs.map(blog => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )
}

export default App
