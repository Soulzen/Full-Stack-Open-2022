import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { deleteBlog, likeBlog } from '../reducers/blogsReducer'

const Blog = ({ blog, user }) => {
  const blogStyle = {
    padding: 10,
    paddingLeft: 4,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const dispatch = useDispatch()

  const [fullInfo, setFullInfo] = useState(false)

  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      await dispatch(likeBlog(updatedBlog))
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

  return (
    <div style={blogStyle} className="blog">
      <div className="title">
        {blog.title}{' '}
        <button
          className="showButton"
          onClick={() => {
            setFullInfo(!fullInfo)
          }}
        >
          {fullInfo ? 'hide' : 'show'}
        </button>
      </div>
      {fullInfo ? (
        <div>
          <p className="author">Author: {blog.author}</p>
          <p className="url">Url: {blog.url}</p>
          <div className="likes">
            Likes: {blog.likes}{' '}
            <button onClick={handleLike} className="likeButton">
              Like
            </button>
          </div>
          {user.username === blog.user.username ? (
            <button className="deleteButton" onClick={handleDelete}>
              Delete
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default Blog
