import axios from 'axios'

const baseUrl = '/auth'

const login = async (loginData) => {
  const { data } = await axios.post(`${baseUrl}/login`, loginData)
  return data
}

export default { login }
