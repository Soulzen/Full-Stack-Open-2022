import { useDispatch } from 'react-redux'
import { Button, Link, Typography } from '@mui/material'

import { deleteBlog, updateBlog } from '../reducers/blogsReducer'
import CommentSection from './CommentSection'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      await dispatch(updateBlog(updatedBlog))
    } catch (error) {
      console.error('Unable to update blog')
    }
  }

  const handleDelete = async () => {
    try {
      await dispatch(deleteBlog(blog))
    } catch (error) {
      console.error('Unable to update blog')
    }
  }
  if (!blog) return false
  return (
    <div id="blog" style={{ padding: '15px' }}>
      <Typography
        variant="h5"
        align="left"
        gutterBottom
        sx={{ fontWeight: 'bold', color: 'primary' }}
        id="title"
      >
        {blog.title} by {blog.author}
      </Typography>

      <div>
        <Typography id="url">
          Url:{' '}
          <Link href={blog.url} underline="none">
            {blog.url}
          </Link>
        </Typography>
        <Typography>added by {blog.user.name}</Typography>
        <div id="likes">
          <Typography>
            Likes: {blog.likes}{' '}
            <Button
              variant="contained"
              style={{ margin: 3, padding: 2 }}
              onClick={handleLike}
              id="likeButton"
            >
              Like
            </Button>
          </Typography>
        </div>
        <CommentSection blog={blog} />
        {user.username === blog.user.username ? (
          <Button
            variant="outlined"
            style={{ margin: 5 }}
            id="deleteButton"
            onClick={handleDelete}
          >
            Delete
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default Blog
