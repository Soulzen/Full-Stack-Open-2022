import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    set(state, action) {
      return action.payload
    },
    create(state, action) {
      return [...state, action.payload]
    }
  }
})

export const { set, create } = blogSlice.actions

export default blogSlice.reducer

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    console.log(blogs)
    dispatch(set(blogs))
  }
}

export const addBlog = blog => {
  return async dispatch => {
    const addedBlog = await blogService.createBlog(blog)
    dispatch(create(addedBlog))
  }
}
