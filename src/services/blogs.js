import axios from 'axios'
const baseUrl = '/api/blogs'
let token = ''

const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

const createAuthToken = (user) => {
  token = `bearer ${user.token}`
}

export default { getAll, createAuthToken }
