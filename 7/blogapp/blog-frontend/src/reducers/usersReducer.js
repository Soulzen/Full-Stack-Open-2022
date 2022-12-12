import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    set(state, action) {
      return action.payload
    }
  }
})

export default usersSlice.reducer

export const { set } = usersSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch(set(users))
  }
}
