import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { toggleVisivility } from '../reducers/togglableReducer'

const NewBlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async event => {
    event.preventDefault()

    const newBlog = { title, author, url, likes: 0 }

    try {
      await dispatch(addBlog(newBlog))
      dispatch(
        setNotification({
          isError: false,
          content: `Created blog ${newBlog.title}`
        })
      )
      dispatch(toggleVisivility())
    } catch (e) {
      console.error('Unable to create blog', e)
      dispatch(
        setNotification({
          isError: true,
          content: 'Unable to create new blog'
        })
      )
    }
  }

  return (
    <div>
      <h3>New Post</h3>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            id="titleInput"
            type="text"
            value={title}
            name="Title"
            placeholder="blog title"
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
          author
          <input
            id="authorInput"
            type="text"
            value={author}
            name="Author"
            placeholder="blog author"
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
          url
          <input
            id="urlInput"
            type="text"
            value={url}
            name="Url"
            placeholder="blog url"
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <button className="createBlogButton" type="submit">
          Create Blog
        </button>
      </form>
    </div>
  )
}

export default NewBlogForm
