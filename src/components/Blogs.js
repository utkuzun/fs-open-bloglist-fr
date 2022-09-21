import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import AddBlog from './AddBlog'
import ToggleBox from './ToggleBox'

import { addBlog } from '../reducers/blogReducer'
import { displayInfo } from '../reducers/infoReducer'

const Blogs = () => {
  const [showChildren, setShowChildren] = useState(false)
  const blogs = useSelector((state) => state.blogs)

  const dispatch = useDispatch()

  const createBlog = async (blogForm) => {
    try {
      dispatch(addBlog(blogForm))
      dispatch(displayInfo('Blog added', 'success'))
      setShowChildren(!showChildren)
    } catch (error) {
      const message = error.response.data.error
      dispatch(displayInfo(message, 'error'))
    }
  }

  return (
    <section>
      <h3>blogs</h3>
      <ul className='blog-list flex-col'>
        {blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
      </ul>
      <ToggleBox
        showChildren={showChildren}
        setShowChildren={setShowChildren}
        buttonLabel={'add blog'}
      >
        <AddBlog createBlog={createBlog} />
      </ToggleBox>
    </section>
  )
}

export default Blogs
