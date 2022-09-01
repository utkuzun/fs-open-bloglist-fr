import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogsSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },

    addBlogList(state, action) {
      return [...state, action.payload]
    },
  },
})

export const getInitialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = (blodToAdd) => {
  return async (dispatch) => {
    const { blog: addedBlog } = await blogService.addBlog(blodToAdd)
    dispatch(addBlogList(addedBlog))
  }
}

export const { setBlogs, addBlogList } = blogsSlice.actions
export default blogsSlice.reducer
