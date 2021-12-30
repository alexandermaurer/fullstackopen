import React, { useState, useEffect } from 'react'
import axios from 'axios'


export const RenderCountryData = ({ country }) => {

  const [weather, setWeather] = useState([])
  const [ready, setReady] = useState(false)

  console.log('api.openweathermap.org/data/2.5/weather?q=' + country.capital + '&appid=' + process.env.REACT_APP_API_KEY)


  useEffect(() => {
    axios
      .get('https://api.openweathermap.org/data/2.5/weather?q=' + country.capital + '&appid=' + process.env.REACT_APP_API_KEY + '&units=metric')
      .then(response => {
        setWeather(response.data)
        setReady(true)
      })
  }, [])

  console.log(weather)


  return (
    <div>
      <div>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h2>Languages</h2>
        <ul>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img style={{ height: 100 + 'px' }} src={country.flag} />
      </div>
      {ready &&
        <div>
          <h2>Weather in {country.capital}</h2>
          <img src={"http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"} />
          <p>Temperature: {weather.main.temp}</p>
          <p>Wind speed: {weather.wind.speed}</p>
        </div>
      }
      {!ready &&
        <><p>Loading weather data...</p></>
      }
    </div>
  );
};
