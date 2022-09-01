import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import { displayInfo } from '../reducers/infoReducer'

import Blog from './Blog'
import AddBlog from './AddBlog'
import ToggleBox from './ToggleBox'

import {
  getInitialBlogs,
  addBlog,
  updateThunk,
  removeThunk,
} from '../reducers/blogReducer'
import { displayInfo } from '../reducers/infoReducer'

const Blogs = ({ user, logout }) => {
  const [showChildren, setShowChildren] = useState(false)
  const blogs = useSelector((state) => state.blogs)

  const dispatch = useDispatch()

  const { name } = user

  useEffect(() => {
    dispatch(getInitialBlogs())
  }, [])

  const createBlog = async (blogForm) => {
    try {
      dispatch(addBlog(blogForm))
      dispatch(displayInfo('Blog added', 'success'))
      setShowChildren(!showChildren)
    } catch (error) {
      const message = error.response.data.error
      dispatch(displayInfo(message, 'error'))
    }
  }

  const updateBlog = async (blog) => {
    try {
      dispatch(updateThunk(blog))
    } catch (error) {
      const message = error.response.data.error
      dispatch(displayInfo(message, 'error'))
    }
  }

  const removeBlog = async (blog) => {
    try {
      dispatch(removeThunk(blog))
    } catch (error) {
      const message = error.response.data.error
      dispatch(displayInfo(message, 'error'))
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{name} logged in</p>
      <button onClick={logout}>Logout</button>
      <br />
      <ToggleBox
        showChildren={showChildren}
        setShowChildren={setShowChildren}
        buttonLabel={'add blog'}
      >
        <AddBlog createBlog={createBlog} />
      </ToggleBox>
      <br />
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
          />
        ))}
    </div>
  )
}

export default Blogs
