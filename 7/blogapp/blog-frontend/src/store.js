import { configureStore } from '@reduxjs/toolkit'

import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/usersReducer'
import notificationReducer from './reducers/notificationReducer'
import togglableReducer from './reducers/togglableReducer'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    user: userReducer,
    notification: notificationReducer,
    visible: togglableReducer
  }
})

export default store
