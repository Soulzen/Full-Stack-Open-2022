import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Toggable'

import blogService from './services/blogs'

import { initializeBlogs, addBlog } from './reducers/blogsReducer'

const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    isError: false,
    content: null
  })

  const dispatch = useDispatch()

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  const noteFormRef = useRef()

  const updateUser = user => {
    setUser(user)
  }

  const updateNotification = message => {
    setNotification(message)
    setTimeout(() => {
      setNotification({
        isError: false,
        content: null
      })
    }, 3000)
  }

  const createBlog = async newBlog => {
    try {
      dispatch(addBlog(newBlog))
      noteFormRef.current.toggleVisibility()
      updateNotification({
        isError: false,
        content: `Created blog ${newBlog.title}`
      })
    } catch (e) {
      console.error('Unable to create blog', e)
      updateNotification({
        isError: true,
        content: 'Unable to create new blog'
      })
    }
  }

  const addLike = async () => /* blog */ {
    try {
      //const updatedBlog = await blogService.updateBlog(blog)
      /* const updatedBlogs = blogs.map(blog => {
        return blog.id === updatedBlog.id ? updatedBlog : blog
      }) */
      //setBlogs(updatedBlogs)
    } catch (error) {
      console.error('Unable to update blog')
    }
  }

  const deleteBlog = async blogToDelete => {
    try {
      await blogService.deleteBlog(blogToDelete)
      /* const remainingBlogs = blogs.filter(blog => {
        return blog.id !== blogToDelete.id
      })

      setBlogs(remainingBlogs) */
    } catch (error) {
      console.error('Unable to update blog')
    }
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortedBlogs = [...blogs].sort((a, b) => {
    return b.likes - a.likes
  })

  return user === null ? (
    <>
      <Notification message={notification}></Notification>
      <LoginForm
        updateUser={updateUser}
        updateNotification={updateNotification}
      ></LoginForm>
    </>
  ) : (
    <div>
      <h2>blogs</h2>
      <Notification message={notification}></Notification>
      <div>
        {user.name} logged in
        <button
          onClick={() => {
            window.localStorage.removeItem('loggedUser')
            setUser(null)
          }}
        >
          Logout
        </button>
      </div>
      <Togglable buttonLabel="New Blog" ref={noteFormRef}>
        <NewBlogForm createBlog={createBlog}></NewBlogForm>
      </Togglable>
      {sortedBlogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={addLike}
          user={user}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  )
}

export default App
