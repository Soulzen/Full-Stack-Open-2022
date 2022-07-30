import React from "react"

const Persons = ({ persons, newFilter }) => {
  return persons
    .filter((person) => person.name.toLowerCase().includes(newFilter))
    .map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    ))
}

export default Persons
