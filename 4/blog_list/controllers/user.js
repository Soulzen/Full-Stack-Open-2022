const bcrypt = require('bcrypt')

const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1
  })
  res.status(200).json(users)
})

userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if (username === undefined || username.length < 3) {
    return res.status(400).json({
      error: 'Username is required and needs to be at least 3 characters long'
    })
  }
  if (password === undefined || password.length < 3) {
    return res.status(400).json({
      error: 'Password is required and needs to be at least 3 characters long'
    })
  }

  const foundUser = await User.findOne({ username })
  if (foundUser) {
    return res.status(400).json({ error: 'Username must be unique' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({ username, name, password: passwordHash })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

module.exports = userRouter
