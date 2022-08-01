import axios from "axios"
import React, { useEffect, useState } from "react"
import Country from "./components/Country"
import Find from "./components/Find"

const App = () => {
  const [countries, setCountries] = useState([])
  const [input, setInput] = useState("")

  const ow_api_key = process.env.REACT_APP_OPENWEATHER_API_KEY

  const handleInput = ({ target }) => {
    setInput(target.value)
  }

  const handleShow = ({ target }, countryName) => {
    setInput(countryName)
  }

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data)
    })
  }, [])

  return (
    <div>
      <Find input={input} handleInput={handleInput}></Find>
      <Country
        countries={countries.filter((country) =>
          country.name.common.toLowerCase().includes(input.toLowerCase())
        )}
        handleShow={handleShow}
        ow_api_key={ow_api_key}
      ></Country>
    </div>
  )
}

export default App
