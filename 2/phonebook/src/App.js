import { useState, useEffect } from "react"
import axios from "axios"

import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([])

  const [newFilter, setNewFilter] = useState("")
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data)
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    let write = true
    persons.forEach((person) => {
      if (person.name === newName) {
        alert(`${newName} is already on the phonebook`)
        write = false
      }
    })
    if (write) setPersons(persons.concat({ name: newName, number: newNumber }))
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
      <Persons persons={persons} newFilter={newFilter}></Persons>
    </div>
  )
}

export default App
