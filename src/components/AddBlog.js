import React, { useState } from 'react'

const AddBlog = ({ createBlog }) => {
  const [blogForm, setBlogForm] = useState({ title: '', author: '', url: '' })

  const { title, author, url } = blogForm

  const handleBlogFormChange = (e) => {
    const { name, value } = e.target
    setBlogForm({ ...blogForm, [name]: value })
  }

  const handleAddblogSubmit = async (e) => {
    e.preventDefault()
    try {
      await createBlog(blogForm)
      setBlogForm({ title: '', author: '', url: '' })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <h1>create new</h1>
      <form onSubmit={handleAddblogSubmit}>
        <div>
          <label htmlFor='title'>title</label>
          <input
            type='text'
            name='title'
            value={title}
            onChange={handleBlogFormChange}
          />
        </div>
        <div>
          <label htmlFor='author'>author</label>
          <input
            type='text'
            name='author'
            value={author}
            onChange={handleBlogFormChange}
          />
        </div>
        <div>
          <label htmlFor='url'>url</label>
          <input
            type='text'
            name='url'
            value={url}
            onChange={handleBlogFormChange}
          />
        </div>
        <button type='submit'>submit</button>
      </form>
    </>
  )
}

export default AddBlog
