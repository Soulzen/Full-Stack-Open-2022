require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

const app = express()

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(express.static('build'))
app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/info', (req, res) => {
  Person.countDocuments().then((result) => {
    res.send(
      `<div>
      <p>Phonebook has info for ${result} people</p>
      <p>${Date()}</p>
      </div>`
    )
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then((person) => {
      console.log(person)
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  console.log(`Deleting person ${id}`)
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = { ...req.body }
  if (body.name && body.number) {
    const person = new Person({
      name: body.name,
      number: body.number
    })
    person
      .save()
      .then((savedPerson) => {
        res.json(savedPerson)
      })
      .catch((error) => next(error))
  }
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  const id = req.params.id

  Person.findByIdAndUpdate(
    id,
    { name, number },
    {
      new: true,
      runValidators: true,
      context: 'query'
    }
  )
    .then((updatedPerson) => {
      res.json(updatedPerson)
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`)
})
