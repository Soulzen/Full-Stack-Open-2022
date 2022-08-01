import React from "react"
import SingleCountry from "./SingleCountry"

const Country = ({ countries, handleShow, ow_api_key }) => {
  //THERE ARE MORE THAN 10 COUNTRIES FILTERED
  if (countries.length > 10) {
    return <div>To many countries</div>
  }
  //THERE ARE BETWEEN 10 AND 1 COUNTRIES FILTERED
  else if (countries.length > 1) {
    return countries.map((country) => (
      <p key={country.cca3}>
        {country.name.common}{" "}
        <button onClick={(event) => handleShow(event, country.name.common)}>
          Show
        </button>
      </p>
    ))
  }
  //THERE IS ONE COUNTRY FILTERED
  else if (countries.length === 1) {
    const country = countries[0]

    return (
      <SingleCountry country={country} ow_api_key={ow_api_key}></SingleCountry>
    )
  }
  //THERE ARE NO COUNTRIES FILTERED
  else {
    return <p>No coincidences</p>
  }
}

export default Country
