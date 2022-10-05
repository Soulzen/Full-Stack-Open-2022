const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Viajeros Patiperros',
    author: 'Makarena Ponce',
    url: 'https://www.viajerospatiperros.nomakal.com',
    likes: 100,
    user: '633d949449ee25db943e6d85'
  },
  {
    title: 'Viajeros Callejeros',
    author: 'Vanessa y Roger',
    url: 'https://www.viajeroscallejeros.com/',
    likes: 20,
    user: '633d949449ee25db943e6d85'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'gonna',
    author: 'be',
    url: 'erased',
    likes: 100
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}
