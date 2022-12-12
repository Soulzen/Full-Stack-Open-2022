import { createSlice } from '@reduxjs/toolkit'

const togglableSlice = createSlice({
  name: 'visible',
  initialState: false,
  reducers: {
    toggleVisivility(state) {
      return !state
    }
  }
})

export default togglableSlice.reducer

export const { toggleVisivility } = togglableSlice.actions
