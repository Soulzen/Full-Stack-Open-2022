const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')

const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('creating new users with one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'root',
      name: 'rootName',
      password: passwordHash
    })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Soulzen',
      name: 'Alberto Navarro',
      password: 'secretpassword'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with no username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Alberto Navarro',
      password: 'secretpassword'
    }

    await api.post('/api/users').send(newUser).expect(400).expect({
      error: 'Username is required and needs to be at least 3 characters long'
    })

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with username shorter than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Io',
      name: 'Alberto Navarro',
      password: 'secretpassword'
    }

    await api.post('/api/users').send(newUser).expect(400).expect({
      error: 'Username is required and needs to be at least 3 characters long'
    })

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with no password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Soulzen',
      name: 'Alberto Navarro'
    }

    await api.post('/api/users').send(newUser).expect(400).expect({
      error: 'Password is required and needs to be at least 3 characters long'
    })

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with password shorter than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Soulzen',
      name: 'Alberto Navarro',
      password: 'se'
    }

    await api.post('/api/users').send(newUser).expect(400).expect({
      error: 'Password is required and needs to be at least 3 characters long'
    })

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with not unique username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Alberto Navarro',
      password: 'secretpassword'
    }

    await api.post('/api/users').send(newUser).expect(400).expect({
      error: 'Username must be unique'
    })

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
