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
    },
    remove(state, action) {
      return state.filter(blog => {
        return blog.id !== action.payload.id
      })
    },
    like(state, action) {
      return state.map(blog => {
        return blog.id === action.payload.id ? action.payload : blog
      })
    }
  }
})

export const { set, create, remove, like } = blogSlice.actions

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
    console.log('Added Blog: ', addedBlog)
    dispatch(create(addedBlog))
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    await blogService.deleteBlog(blog)
    dispatch(remove(blog))
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const updatedBlog = await blogService.updateBlog(blog)
    dispatch(like(updatedBlog))
  }
}
