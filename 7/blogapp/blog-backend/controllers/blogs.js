const router = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })

  response.json(blogs)
})

router.get('/:id/comments', async (request, response) => {
  const comments = await Comment.find({ blog: request.params.id })
  response.json(comments)
})

router.post('/', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = request.user
  const blog = new Blog({ ...request.body, user: user.id })

  const savedBlog = await blog.save()

  user.blogs = user.blogs ? user.blogs.concat(savedBlog._id) : [savedBlog._id]
  await user.save()

  response.status(201).json(savedBlog)
})

router.post('/:id/comments', async (request, response) => {
  const id = request.params.id

  const blog = await Blog.findById(id)
  const comment = new Comment({ comment: request.body.comment, blog: blog.id })

  const savedComment = await comment.save()

  blog.comments = blog.comments
    ? [...blog.comments, savedComment._id]
    : [savedComment._id]
  await blog.save()

  response.status(201).json(savedComment)
})

router.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    return response.status(204).end()
  }

  if (blogToDelete.user && blogToDelete.user.toString() !== request.user.id) {
    return response.status(401).json({
      error: 'only the creator can delete a blog'
    })
  }

  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query'
  })
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })

  response.json(updatedBlog)
})

module.exports = router
