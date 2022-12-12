import { useState } from 'react'

const Blog = ({ blog, addLike, user, deleteBlog }) => {
  const blogStyle = {
    padding: 10,
    paddingLeft: 4,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [fullInfo, setFullInfo] = useState(false)

  const handleLike = () => {
    addLike({ ...blog, likes: blog.likes + 1 })
  }

  const handleDelete = () => {
    deleteBlog(blog)
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
