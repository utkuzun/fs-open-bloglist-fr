import React from 'react'
import { useDispatch } from 'react-redux'

import { updateThunk, removeThunk } from '../reducers/blogReducer'
import { displayInfo } from '../reducers/infoReducer'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blogSelected: blog }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  if (!blog) {
    return null
  }

  const { title, likes, url, author } = blog

  const increaseLike = async () => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 }
    delete blogToUpdate.user
    try {
      dispatch(updateThunk(blogToUpdate))
    } catch (error) {
      const message = error.response.data.error
      dispatch(displayInfo(message, 'error'))
    }
  }

  const remove = async () => {
    try {
      if (window.confirm(`Delete blog ${blog.title} ?`)) {
        await dispatch(removeThunk(blog))
        navigate('/')
      }
    } catch (error) {
      const message = error.response.data.error
      dispatch(displayInfo(message, 'error'))
    }
  }

  return (
    <div>
      <div>
        <p>{title}</p>
        <p>{url}</p>
        <p>
          likes {likes} <button onClick={increaseLike}>like</button>
        </p>
        <p>{author}</p>
        <button onClick={remove}>remove</button>
      </div>
    </div>
  )
}

export default Blog
