import React, { useState, useEffect } from 'react'

import Blog from './Blog'
import AddBlog from './AddBlog'
import ToggleBox from './ToggleBox'

import blogService from '../services/blogs'

const Blogs = ({ user, logout, logInfo }) => {
  const [blogs, setBlogs] = useState([])
  const [showChildren, setShowChildren] = useState(false)

  const { name } = user

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    fetchBlogs()
  }, [])

  const createBlog = async (blogForm) => {
    try {
      const { blog } = await blogService.addBlog(blogForm)
      setBlogs([...blogs, blog])
      setShowChildren(!showChildren)
      logInfo('Blog added', 'success')
    } catch (error) {
      const message = error.response.data.error
      logInfo(message, 'error')
    }
  }

  const updateBlog = async (blog) => {
    try {
      const { blog: blogAdded } = await blogService.updateBlog(blog)
      const newBlogs = blogs.map((item) =>
        blog.id === item.id ? blogAdded : item
      )
      setBlogs(newBlogs)
    } catch (error) {
      const message = error.response.data.error
      logInfo(message, 'error')
    }
  }

  const removeBlog = async (blog) => {
    try {
      await blogService.removeBlog(blog)
      const newBlogs = blogs.filter((item) => item.id !== blog.id)
      setBlogs(newBlogs)
    } catch (error) {
      const message = error.response.data.error
      logInfo(message, 'error')
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
