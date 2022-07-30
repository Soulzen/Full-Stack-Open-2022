import React from "react"

const Filter = ({ handleFilter }) => (
  <form>
    <div>
      filter: <input onChange={handleFilter}></input>
    </div>
  </form>
)

export default Filter
