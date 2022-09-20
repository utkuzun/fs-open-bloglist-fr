import axios from 'axios'
const baseUrl = '/api/blogs'
let token = ''

const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

const addBlog = async (blog) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(`${baseUrl}`, blog, config)
  return response.data
}

const updateBlog = async (blog) => {
  const config = { headers: { Authorization: token } }
  const { data } = await axios.patch(`${baseUrl}/${blog.id}`, blog, config)
  return data
}

const removeBlog = async (blog) => {
  const config = { headers: { Authorization: token } }
  const { data } = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return data
}

const commentToBlog = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  const { data } = response
  return data
}

const createAuthToken = (user) => {
  token = `bearer ${user.token}`
}

const removeToken = () => {
  token = ''
}

export default {
  getAll,
  createAuthToken,
  removeToken,
  addBlog,
  updateBlog,
  removeBlog,
  commentToBlog,
}
