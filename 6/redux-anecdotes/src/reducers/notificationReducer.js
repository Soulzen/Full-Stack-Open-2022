import { createSlice } from "@reduxjs/toolkit"

const notificationReducer = createSlice({
  name: "notification",
  initialState: { message: "Wellcome", visible: false },
  reducers: {
    createNotification(state, action) {
      return { message: action.payload, visible: true }
    },
    deleteNotification(state, action) {
      return { message: "", visible: false }
    }
  }
})

export const { createNotification, deleteNotification } =
  notificationReducer.actions

let lastTimeOut = null

export const setNotification = (message, time) => {
  return async (dispatch) => {
    if (lastTimeOut !== null) {
      clearTimeout(lastTimeOut)
    }
    dispatch(createNotification(message))
    lastTimeOut = setTimeout(() => {
      dispatch(deleteNotification())
    }, time * 1000)
  }
}
export default notificationReducer.reducer
