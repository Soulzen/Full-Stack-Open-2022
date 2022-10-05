const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  })
  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const likes = request.body.likes || 0

  if (request.body.title === undefined || request.body.url === undefined) {
    return response
      .status(400)
      .json({ error: 'The blog must have title and url' })
  }

  const user = await User.findById(request.user)

  const blog = new Blog({
    ...request.body,
    likes,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const targetBlog = await Blog.findById(request.params.id)

  if (targetBlog.user.toString() === request.user.toString()) {
    await targetBlog.delete()
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'you are not the owner of this blog' })
  }
})

blogRouter.put('/:id', userExtractor, async (request, response) => {
  const likes = request.body.likes
  const id = request.params.id

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { likes: likes },
    {
      new: true,
      runValidators: true,
      context: 'query'
    }
  )
  response.json(updatedBlog)
})

module.exports = blogRouter
