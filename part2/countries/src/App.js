import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Content } from './components/Content'
import { Searchbar } from './components/Searchbar'


function App() {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  const filterToCountry = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const filteredCountries = (filter === '')
    ? countries
    : countries.filter(country =>
      country.name.toLowerCase().includes(filter.toLowerCase())
    )



  return (
    <div>
      <Searchbar search={filter} handleFilter={handleFilter} />
      <Content countries={filteredCountries} filterToCountry={filterToCountry}/>
    </div>
  )
}

export default App;
