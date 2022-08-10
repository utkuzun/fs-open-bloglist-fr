import React from 'react'
import Blog from './Blog'
import AddBlog from './AddBlog'

const Blogs = ({
  blogs,
  user,
  logout,
  handleBlogFormChange,
  blogForm,
  handleAddblogSubmit,
}) => {
  const { name } = user
  return (
    <div>
      <h2>blogs</h2>
      <p>{name} logged in</p>
      <button onClick={logout}>Logout</button>
      <AddBlog
        blogForm={blogForm}
        handleBlogFormChange={handleBlogFormChange}
        handleAddblogSubmit={handleAddblogSubmit}
      />
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Blogs
