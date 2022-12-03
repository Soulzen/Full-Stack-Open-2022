import { useState } from 'react'

const NewPostForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = event => {
    event.preventDefault()

    const newBlog = { title, author, url, likes: 0 }
    createBlog(newBlog)
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

export default NewPostForm
