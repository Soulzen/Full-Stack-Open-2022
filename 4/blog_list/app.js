const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const blogRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const { tokenExtractor } = require('./utils/middleware')

app.use(express.json())
app.use(tokenExtractor)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

mongoose
  .connect(config.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB: ', error.message)
  })

app.use(cors())

module.exports = app
