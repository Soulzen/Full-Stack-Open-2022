const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, blogsInDb } = require('./test_helper')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = initialBlogs.map((blog) => {
      return new Blog(blog)
    })
    const blogPromises = blogObjects.map((blog) => {
      return blog.save()
    })
    await Promise.all(blogPromises)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map((r) => r.title)
    expect(contents).toContain('Viajeros Callejeros')
  })

  test('test that verifies that the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('addition of a new blog with token', () => {
  let token = null

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('12345', 10)
    const user = new User({
      username: 'Soulzen',
      name: 'Alberto Navarro',
      password: passwordHash
    })
    await user.save()

    const userForToken = { username: user.username, id: user.id }
    return (token = jwt.sign(userForToken, process.env.SECRET))
  })

  test('test that verifies that making an HTTP POST request to the /api/blogs url successfully creates a new blog post', async () => {
    const blogsBefore = await blogsInDb()

    const newBlog = {
      title: 'El viaje de sofi',
      author: 'Sofi',
      url: 'https://www.elviajedesofi.com/',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .send(newBlog)
      .expect(201)

    const blogsAfter = await blogsInDb()

    expect(blogsAfter).toHaveLength(blogsBefore.length + 1)

    const titles = blogsAfter.map((r) => r.title)
    expect(titles).toContain('El viaje de sofi')
  })

  test('test that verifies that if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: 'Mochileando por el mundo',
      author: 'Robert y Leti',
      url: 'https://www.mochileandoporelmundo.com/'
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .send(newBlog)
      .expect(201)

    const blogs = await blogsInDb()

    const thisBlog = blogs.find(
      (blog) => blog.title === 'Mochileando por el mundo'
    )
    expect(thisBlog.likes).toBe(0)
  })

  test('test that verifies that if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.', async () => {
    const blogsBefore = await blogsInDb()

    const newBlog = {
      author: 'Robert y Leti',
      url: 'https://www.mochileandoporelmundo.com/',
      likes: 30
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .send(newBlog)
      .expect(400)

    const blogsAfter = await blogsInDb()
    expect(blogsAfter).toHaveLength(blogsBefore.length)
  })
  test('test that verifies that if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.', async () => {
    const blogsBefore = await blogsInDb()

    const newBlog = {
      title: 'Mochileando por el mundo',
      author: 'Robert y Leti',
      likes: 30
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .send(newBlog)
      .expect(400)

    const blogsAfter = await blogsInDb()
    expect(blogsAfter).toHaveLength(blogsBefore.length)
  })
})

describe('deletion of a blog', () => {
  let token = null

  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const passwordHash = await bcrypt.hash('12345', 10)
    const user = new User({
      username: 'Soulzen',
      name: 'Alberto Navarro',
      password: passwordHash
    })
    await user.save()

    const userForToken = { username: user.username, id: user.id }
    token = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = {
      title: 'Viajeros Patiperros',
      author: 'Makarena Ponce',
      url: 'https://www.viajerospatiperros.nomakal.com',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(204)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const contents = blogsAtEnd.map((r) => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })

  test('fails with status code 401 if no token is sent', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]
    const id = blogToDelete.id
    await api.delete(`/api/blogs/${id}`).expect(401)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const contents = blogsAtEnd.map((r) => r.title)

    expect(contents).toContain(blogToDelete.title)
  })
})

describe('update of a blog', () => {
  let token = null

  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const passwordHash = await bcrypt.hash('12345', 10)
    const user = new User({
      username: 'Soulzen',
      name: 'Alberto Navarro',
      password: passwordHash
    })
    await user.save()

    const userForToken = { username: user.username, id: user.id }
    token = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = {
      title: 'Viajeros Patiperros',
      author: 'Makarena Ponce',
      url: 'https://www.viajerospatiperros.nomakal.com',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
  })

  test('updating the information of an individual blog post', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ ...blogToUpdate, likes: 15 })
      .expect(200)

    const blogsAtEnd = await blogsInDb()
    const blogUpdated = blogsAtEnd.find((blog) => {
      return blog.id == blogToUpdate.id
    })
    expect(blogUpdated.likes).toBe(15)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
