import { configureStore } from '@reduxjs/toolkit'

import blogsReducer from './reducers/blogsReducer'
import loggedUserReducer from './reducers/loggedUsersReducer'
import notificationReducer from './reducers/notificationReducer'
import togglableReducer from './reducers/togglableReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    loggedUser: loggedUserReducer,
    notification: notificationReducer,
    visible: togglableReducer,
    users: usersReducer
  }
})

export default store
