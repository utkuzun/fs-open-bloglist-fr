import React from 'react'
import { useDispatch } from 'react-redux'

import {
  updateThunk,
  removeThunk,
  commentToBlogThunk,
} from '../reducers/blogReducer'
import { displayInfo } from '../reducers/infoReducer'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Blog = ({ blogSelected: blog }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [commentIn, setCommentIn] = useState('')

  if (!blog) {
    return null
  }

  const { id, title, likes, url, author, comments } = blog

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

  const comment = async (e) => {
    e.preventDefault()
    try {
      await dispatch(commentToBlogThunk(id, commentIn))
      setCommentIn('')
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
        <h4>comments</h4>
        <form onSubmit={comment}>
          <input
            type='text'
            value={commentIn}
            onChange={(e) => setCommentIn(e.target.value)}
            placeholder='comment please'
          />
          <button type='submit'>comment</button>
        </form>
        {comments.map((comment, i) => (
          <p key={i}>{comment}</p>
        ))}
      </div>
    </div>
  )
}

export default Blog
