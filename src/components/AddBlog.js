import React, { useState } from 'react'
// import PropTypes from 'prop-types'

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
    <form onSubmit={handleAddblogSubmit} className='flex-col'>
      <h3>create new</h3>
      <div className='form-field flex-col'>
        <label htmlFor='title'>title</label>
        <input
          type='text'
          name='title'
          value={title}
          onChange={handleBlogFormChange}
        />
      </div>
      <div className='form-field flex-col'>
        <label htmlFor='author'>author</label>
        <input
          type='text'
          name='author'
          value={author}
          onChange={handleBlogFormChange}
        />
      </div>
      <div className='form-field flex-col'>
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
  )
}

// AddBlog.propTypes = {
//   createBlog: PropTypes.func.isRequired,
// }

export default AddBlog
