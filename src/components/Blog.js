import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [show, setShow] = useState(false)
  const { title, likes, url, author } = blog

  const increaseLike = async () => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 }
    delete blogToUpdate.user
    try {
      await updateBlog(blogToUpdate)
    } catch (error) {
      console.log(error)
    }
  }

  const remove = async () => {
    try {
      if (window.confirm(`Delete blog ${blog.title} ?`)) {
        await removeBlog(blog)
      }
    } catch (error) {
      console.log(error)
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
