import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addComment } from '../reducers/blogsReducer'

const CommentSection = ({ blog }) => {
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(addComment(blog.id, comment))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="commentInput"
          type="text"
          value={comment}
          name="Comment"
          placeholder="add a comment"
          onChange={({ target }) => setComment(target.value)}
        ></input>
        <button type="submit">add comment</button>
      </form>
      <div>
        <ul>
          {blog.comments.map(comment => (
            <li key={comment.id}>{comment.comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CommentSection
