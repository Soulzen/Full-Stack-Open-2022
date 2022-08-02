import React from "react"

const Persons = ({ persons, newFilter, handleRemoveId }) => {
  return persons
    .filter((person) => person.name.toLowerCase().includes(newFilter))
    .map((person) => (
      <p key={person.id}>
        {person.name} {person.number}{" "}
        <button
          onClick={() => {
            handleRemoveId(person.id)
          }}
        >
          Delete
        </button>
      </p>
    ))
}

export default Persons
