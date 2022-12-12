import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    isError: false,
    content: null
  },
  reducers: {
    set(state, action) {
      return action.payload
    }
  }
})

export const { set } = notificationSlice.actions

export default notificationSlice.reducer

export const setNotification = message => {
  return dispatch => {
    dispatch(set(message))
    setTimeout(() => {
      dispatch(
        set({
          isError: false,
          content: null
        })
      )
    }, 3000)
  }
}
