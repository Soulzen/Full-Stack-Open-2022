/* eslint-disable no-undef */
const mongoose = require('mongoose')

let save = false

switch (process.argv.length) {
  case 3:
    save = false
    break

  case 5:
    save = true
    break

  default:
    console.log(
      'Incorrect arguments, try:\nConsulting phonebook: node mongo.js <password>\nAdding number to phonebook: node mongo.js <password> <name> <number>'
    )
    process.exit(1)
    break
}

const password = process.argv[2]
const newName = save ? process.argv[3] : null
const newNumber = save ? process.argv[4] : null

const url = `mongodb+srv://admin-alberto:${password}@cluster0.qwh7kpk.mongodb.net/?retryWrites=true&w=majority`

const personSquema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSquema)

if (save) {
  mongoose
    .connect(url)
    .then(() => {
      console.log('Conected')
      const person = new Person({
        name: newName,
        number: newNumber,
      })
      return person.save()
    })
    .then(() => {
      console.log('Person saved')
      return mongoose.connection.close()
    })
    .catch((error) => {
      console.log(error)
    })
} else {
  mongoose.connect(url).then(() => {
    Person.find({}).then((result) => {
      console.log('Phonebook')
      result.forEach((note) => {
        console.log(`${note.name} ${note.number}`)
      })
      return mongoose.connection.close()
    })
  })
}
