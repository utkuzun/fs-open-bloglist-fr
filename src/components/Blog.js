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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faTrash } from '@fortawesome/free-solid-svg-icons'

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
    <section>
      <article className='flex-col blog-article'>
        <div className='blog-info'>
          <p>{author}</p>
          <p>{url}</p>
        </div>
        <div className='blog-content'>
          <h4>{title}</h4>
        </div>
        <div className='blog-tools flex'>
          <div className='blog-tool flex'>
            <FontAwesomeIcon
              className='tool-icon'
              icon={faHeart}
              onClick={increaseLike}
            />
            <p>{likes}</p>
          </div>
          <div className='blog-tool flex'>
            <FontAwesomeIcon
              className='tool-icon'
              icon={faComment}
              onClick={increaseLike}
            />
            <p>{comments.length}</p>
          </div>
          <div className='blog-tool flex'>
            <FontAwesomeIcon
              className='tool-icon'
              icon={faTrash}
              onClick={remove}
            />
          </div>
        </div>
        <div className='comment-line'>
          <input
            type='text'
            value={commentIn}
            onChange={(e) => setCommentIn(e.target.value)}
            placeholder='comment please'
          />
          <button onClick={comment}>comment</button>
        </div>

        {comments.map((comment, i) => (
          <div key={i} className='comment-line'>
            <p>{comment}</p>
          </div>
        ))}
      </article>
    </section>
  )
}

export default Blog
