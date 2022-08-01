import React from "react"

const Find = ({ input, handleInput }) => {
  return (
    <form>
      Filter: <input onChange={handleInput} value={input}></input>
    </form>
  )
}

export default Find
