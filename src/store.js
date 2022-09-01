import { configureStore } from '@reduxjs/toolkit'
import infoReducer from './reducers/infoReducer'
import blogsReducer from './reducers/blogReducer'

const store = configureStore({
  reducer: {
    info: infoReducer,
    blogs: blogsReducer,
  },
})

export default store
