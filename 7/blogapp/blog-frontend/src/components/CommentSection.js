import { Button, List, ListItem, ListItemText, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addComment } from '../reducers/blogsReducer'

const CommentSection = ({ blog }) => {
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(addComment(blog.id, comment))
    setComment('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          id="commentInput"
          variant="outlined"
          multiline
          fullWidth
          sx={{ flex: 1 }}
          type="text"
          value={comment}
          name="Comment"
          placeholder="add a comment"
          onChange={({ target }) => setComment(target.value)}
        ></TextField>
        <Button variant="contained" type="submit">
          add comment
        </Button>
      </form>
      <div>
        <List>
          {blog.comments.map(comment => (
            <ListItem key={comment.id}>
              <ListItemText>{comment.comment}</ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  )
}

export default CommentSection
