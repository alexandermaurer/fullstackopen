import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { RenderPhonebook } from './components/RenderPhonebook'
import { PersonForm } from './components/PersonForm'
import { Filter } from './components/Filter'

const App = () => {

  const [persons, setPersons] = useState([])


  //STATES
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const addEntry = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    //Check if array persons already contains a person with the same name
    if(persons.some(person => person.name === newName)) {
      alert(`${newName} already exists.`)
      setNewName('')
      setShowAll(true)
      setFilter('')
      return
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
    setShowAll(true)
    setFilter('')
  }

  const personsToShow = showAll
  ? persons
  : persons.filter(person => 
      person.name.toLowerCase().includes(filter.toLowerCase())
    )

  const handleFilter = (event) => {
    setFilter(event.target.value)
    if(event.target.value !== '') {
      setShowAll(false)
    } else {
      setShowAll(true)
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filter={filter} 
        handleFilter={handleFilter} 
      />

      <h2>Add a new person:</h2>
      <PersonForm 
        addEntry={addEntry} 
        newName={newName} 
        handleNewName={handleNewName} 
        newNumber={newNumber} 
        handleNewNumber={handleNewNumber} 
      />

      <h2>Numbers</h2>
      <RenderPhonebook persons={personsToShow} />

    </div>
  )
}

export default App
