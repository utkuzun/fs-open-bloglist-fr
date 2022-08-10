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

const createAuthToken = (user) => {
  token = `bearer ${user.token}`
}

const removeToken = () => {
  token = ''
}

export default { getAll, createAuthToken, removeToken, addBlog }