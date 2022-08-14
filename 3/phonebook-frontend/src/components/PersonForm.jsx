import React from "react"

const PersonForm = ({
  handleName,
  handleNumber,
  handleSubmit,
  newName,
  newNumber
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input onChange={handleName} value={newName} />
    </div>
    <div>
      number: <input onChange={handleNumber} value={newNumber}></input>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm
