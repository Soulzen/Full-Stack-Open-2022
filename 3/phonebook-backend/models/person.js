const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
const url = process.env.MONGO_URL

mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB: ', error.message)
  })

const personSquema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: (v) => /\d{2,3}-\d{6,}/.test(v),
      message: (props) => `${props.value} is not a valid phone number!`
    },
    required: true
  }
})

personSquema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSquema)
