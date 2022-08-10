import React from 'react'

const AddBlog = ({ blogForm, handleBlogFormChange, handleAddblogSubmit }) => {
  const { title, author, url } = blogForm
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
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default AddBlog
