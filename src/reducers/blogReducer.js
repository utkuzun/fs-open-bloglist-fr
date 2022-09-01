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

    updateBlog(state, action) {
      const blogToAdd = action.payload
      const newState = state.map((item) =>
        item.id === blogToAdd.id ? blogToAdd : item
      )
      return newState
    },

    removeBlog(state, action) {
      const newState = state.filter((item) => item.id !== action.payload.id)
      return newState
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

export const updateThunk = (blogToAdd) => {
  return async (dispatch) => {
    const { blog: blogAdded } = await blogService.updateBlog(blogToAdd)
    dispatch(updateBlog(blogAdded))
  }
}

export const removeThunk = (blog) => {
  return async (dispatch) => {
    await blogService.removeBlog(blog)
    dispatch(removeBlog(blog))
  }
}

export const { setBlogs, addBlogList, updateBlog, removeBlog } =
  blogsSlice.actions
export default blogsSlice.reducer
