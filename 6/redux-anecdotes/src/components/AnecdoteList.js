import { useDispatch, useSelector } from "react-redux"

import { increaseVotes } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes.filter((anecdote) => {
      return anecdote.content.toLowerCase().includes(filter.toLowerCase())
    })
  )
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(increaseVotes({ ...anecdote, votes: anecdote.votes + 1 }))
    dispatch(setNotification(`You voted for ${anecdote.content}`, 5))
  }

  const sortedAnecdotes = [...anecdotes].sort((a, b) => {
    return b.votes - a.votes
  })

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
