import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer

export const loadStoredUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const loginUser = user => {
  return async dispatch => {
    const logedUser = await loginService.login(user)
    window.localStorage.setItem('loggedUser', JSON.stringify(logedUser))
    blogService.setToken(logedUser.token)
    dispatch(setUser(logedUser))
  }
}

export const loggout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
  }
}
