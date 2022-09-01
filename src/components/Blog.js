import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { updateThunk, removeThunk } from '../reducers/blogReducer'
import { displayInfo } from '../reducers/infoReducer'

const Blog = ({ blog }) => {
  const [show, setShow] = useState(false)
  const { title, likes, url, author } = blog

  const dispatch = useDispatch()

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
        dispatch(removeThunk(blog))
      }
    } catch (error) {
      const message = error.response.data.error
      dispatch(displayInfo(message, 'error'))
    }
  }

  return (
    <div>
      <div>
        <p>
          {title}
          <button onClick={() => setShow(!show)}>
            {show ? 'hide' : 'show'}
          </button>
        </p>
      </div>
      {show && (
        <div>
          <p>{url}</p>
          <p>
            likes {likes} <button onClick={increaseLike}>like</button>
          </p>
          <p>{author}</p>
          <button onClick={remove}>remove</button>
        </div>
      )}
      <hr />
    </div>
  )
}

export default Blog
