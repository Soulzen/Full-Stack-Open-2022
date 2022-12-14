import { useDispatch } from 'react-redux'

import { deleteBlog, likeBlog } from '../reducers/blogsReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

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
  if (!blog) return false
  return (
    <div id="blog">
      <h2 id="title">
        {blog.title} by {blog.author}
      </h2>

      <div>
        <p id="url">
          Url: <a href={blog.url}> {blog.url}</a>
        </p>
        <div id="likes">
          Likes: {blog.likes}
          <button style={{ margin: 5 }} onClick={handleLike} id="likeButton">
            Like
          </button>
        </div>
        {user.username === blog.user.username ? (
          <button style={{ margin: 5 }} id="deleteButton" onClick={handleDelete}>
            Delete
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default Blog
