import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotes"

/* const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
] */

//const getId = () => (100000 * Math.random()).toFixed(0)

/*const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}*/

//const initialState = anecdotesAtStart.map(asObject)

/* const anecdoteReducer = (state = initialState, action) => {
  console.log("state now: ", state)
  console.log("action", action)

  switch (action.type) {
    case "VOTE":
      return state.map((anecdote) => {
        return anecdote.id === action.payload
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      })
    case "CREATE":
      return [...state, action.payload]

    default:
      return state
  }
}

export const addVote = (id) => {
  return {
    type: "VOTE",
    payload: id
  }
}

export const create = (anecdote) => {
  return {
    type: "CREATE",
    payload: asObject(anecdote)
  }
} */

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    create(state, action) {
      return [...state, action.payload]
    },
    addVote(state, action) {
      return state.map((anecdote) => {
        return anecdote.id === action.payload.id ? action.payload : anecdote
      })
    },
    insert(state, action) {
      return [...state, action.payload]
    },
    set(state, action) {
      return action.payload
    }
  }
})

export const { create, addVote, insert, set } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(set(anecdotes))
  }
}

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const savedAnecdote = await anecdotesService.createNew(anecdote)
    dispatch(create(savedAnecdote))
  }
}

export const increaseVotes = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesService.updateAnecdote(anecdote)
    dispatch(addVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
