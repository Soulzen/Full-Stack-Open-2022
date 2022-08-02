import { useState, useEffect } from "react"

import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

import numbersService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])

  const [newFilter, setNewFilter] = useState("")
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

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
            })
        }
      }
    })
    console.log("Write:", write)
    if (write) {
      const newPerson = { name: newName, number: newNumber }
      numbersService.create(newPerson).then((data) => {
        setPersons(persons.concat(data))
        setNewName("")
        setNewNumber("")
      })
    }
  }

  const handleRemoveId = (id) => {
    const personToDelete = persons.find((person) => person.id === id)
    if (window.confirm(`Do you want to delete ${personToDelete.name}?`))
      numbersService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id))
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
