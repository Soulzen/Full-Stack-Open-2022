import React, { useEffect, useState } from "react"
import axios from "axios"

const SingleCountry = ({ country, ow_api_key }) => {
  const [weather, setWeather] = useState()

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&exclude=hourly,daily&appid=${ow_api_key}&units=metric`
      )
      .then((response) => {
        setWeather(response.data)
      })
  }, [country.capitalInfo.latlng, ow_api_key])

  return (
    <div>
      <h1>{country.name.common}</h1>
      {country.capital.map((capital) => (
        <p key={capital}>Capital {capital}</p>
      ))}
      <p>Area {country.area}</p>
      <h3>Languagues:</h3>
      {Object.values(country.languages).map((lang) => (
        <p key={lang}>{lang}</p>
      ))}
      <img src={country.flags.png} alt="Flag"></img>
      <div>
        <h2>Weather in {country.capital[0]}</h2>
        {weather !== undefined ? (
          <>
            <p>Temperature is {weather.current.temp}ºC</p>
            <img
              src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
              alt="weather"
            ></img>
            <p>Wind is {weather.current.wind_speed} m/s</p>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default SingleCountry
