import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createBlog = async blog => {
  const config = {
    headers: { Authorization: token }
  }

  const request = await axios.post(baseUrl, blog, config)
  return request.data
}

const updateBlog = async blog => {
  const config = {
    headers: { Authorization: token }
  }

  const backendBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: blog.user.id
  }

  const request = await axios.put(`${baseUrl}/${blog.id}`, backendBlog, config)
  return request.data
}

const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token }
  }

  const request = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return request.data
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const blogService = { getAll, createBlog, updateBlog, deleteBlog, setToken }

export default blogService
