import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { TextField, Button, Typography } from '@mui/material'

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

  const inputStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '5px 10px'
  }

  const textSyle = {
    display: 'flex',
    minWidth: '150px'
  }

  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom>
        NEW POST
      </Typography>
      <form onSubmit={handleSubmit}>
        <div style={inputStyle}>
          <Typography sx={textSyle}>Title </Typography>
          <TextField
            sx={{ flex: 1 }}
            size="small"
            id="titleInput"
            type="text"
            value={title}
            name="Title"
            placeholder="blog title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div style={inputStyle}>
          <Typography sx={textSyle}>Author </Typography>
          <TextField
            sx={{ flex: 1 }}
            size="small"
            id="authorInput"
            type="text"
            value={author}
            name="Author"
            placeholder="blog author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div style={inputStyle}>
          <Typography sx={textSyle}>Url</Typography>
          <TextField
            sx={{ flex: 1 }}
            size="small"
            id="urlInput"
            type="text"
            value={url}
            name="Url"
            placeholder="blog url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button
          sx={{ margin: '10px' }}
          className="createBlogButton"
          type="submit"
          variant="contained"
          color="primary"
        >
          Create Blog
        </Button>
      </form>
    </div>
  )
}

export default NewBlogForm
