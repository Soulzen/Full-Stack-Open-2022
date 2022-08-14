import { useState, useEffect } from "react"

import Filter from "./components/Filter"
import Notification from "./components/Notification"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

import numbersService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])

  const [newFilter, setNewFilter] = useState("")
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [message, setMessage] = useState({ content: null, isError: false })

  useEffect(() => {
    numbersService.getAll().then((initialNumbers) => {
      setPersons(initialNumbers)
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    let write = true
    persons.forEach((person) => {
      if (person.name === newName) {
        write = false
        if (
          window.confirm(
            `${person.name} is already in the phonebook. Would you like to update the number?`
          )
        ) {
          numbersService
            .update(person.id, { ...person, number: newNumber })
            .then((data) => {
              setPersons(persons.map((p) => (p.id === person.id ? data : p)))
              setMessage({
                content: `Person ${data.name} was updated in the phonebook`,
                isError: false
              })
              setTimeout(() => {
                setMessage({ content: null, isError: false })
              }, 5000)
            })
            .catch((error) => {
              setMessage({
                content: `The person ${person.name} was already deleted from the server`,
                isError: true
              })
              setTimeout(() => {
                setMessage({ content: null, isError: false })
              }, 5000)
              setPersons(persons.filter((p) => p.id !== person.id))
            })
        }
      }
    })
    if (write) {
      const newPerson = { name: newName, number: newNumber }
      numbersService
        .create(newPerson)
        .then((data) => {
          setPersons(persons.concat(data))
          setNewName("")
          setNewNumber("")
          setMessage({
            content: `Person ${data.name} was added to the phonebook`,
            isError: false
          })
          setTimeout(() => {
            setMessage({ content: null, isError: false })
          }, 5000)
        })
        .catch((error) => {
          // this is the way to access the error message
          console.log("Error trying to add person:", error)
          setMessage({ content: error.response.data.error, isError: true })
          setTimeout(() => {
            setMessage({ content: null, isError: false })
          }, 5000)
        })
    }
  }

  const handleRemoveId = (id) => {
    const personToDelete = persons.find((person) => person.id === id)
    if (window.confirm(`Do you want to delete ${personToDelete.name}?`))
      numbersService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
        })
        .catch((error) => {
          setMessage({
            content: `The person ${personToDelete.name} was already deleted from the server`,
            isError: true
          })
          setTimeout(() => {
            setMessage({ content: null, isError: false })
          }, 5000)
          setPersons(persons.filter((p) => p.id !== personToDelete.id))
        })
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}></Notification>
      <Filter handleFilter={handleFilter}></Filter>
      <h2>Add a New</h2>
      <PersonForm
        handleName={handleName}
        handleNumber={handleNumber}
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
      ></PersonForm>
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        newFilter={newFilter}
        handleRemoveId={handleRemoveId}
      ></Persons>
    </div>
  )
}

export default App
