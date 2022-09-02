import { configureStore } from '@reduxjs/toolkit'
import infoReducer from './reducers/infoReducer'
import blogsReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    info: infoReducer,
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer,
  },
})

export default store
