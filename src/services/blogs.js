import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (content) => {
  const auth = `Bearer ${content.token}`;
  const request = axios.post(baseUrl, content.blog, { headers: { Authorization: auth }})
  return request.then(response => response.data)
}

export default { getAll, create }