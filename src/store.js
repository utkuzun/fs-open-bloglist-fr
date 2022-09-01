import { configureStore } from '@reduxjs/toolkit'
import infoReducer from './reducers/infoReducer'
import blogsReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    info: infoReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
})

export default store
