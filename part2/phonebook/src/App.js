import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { RenderPhonebook } from './components/RenderPhonebook'
import { PersonForm } from './components/PersonForm'
import { Filter } from './components/Filter'
import {Notification} from './components/Notification'
import './index.css'

import phonebookService from './services/phonebook'

const App = () => {

  //STATES
  
  //STATE ARRAY FOR PERSONS
  const [persons, setPersons] = useState([])

  //STATE ARRAYS FOR NEW DATA
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  //STATE ARRAYS TO FILTER VIEW
  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState('')

  //STATE ARRAYS FOR NOTIFICATIONS
  const [message, setMessage] = useState([null, false])

  useEffect(() => {
    phonebookService
    .getAll()
    .then(initialContacts => {
      setPersons(initialContacts)
    })
  }, [])

  const deleteContact = (person) => {
    const confirmation = window.confirm(`Are you sure you want to delete ${person.name}`)
    if (confirmation) {
      phonebookService
      .deleteContact(person.id)
      .then(
        setPersons(persons.filter(objects => objects.id != person.id))
      )
      .catch( error => {
        setMessage([`Person '${person.name} does not exist on server`, true])
        setTimeout(() => {setMessage([null, false])}, 5000)
        setPersons(persons.filter(objects => objects.id != person.id))
      }
      )
    }
  }

  const addEntry = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    //Check if array persons already contains a person with the same name and ask the user to update
    if(persons.some(person => person.name === newName)) {
      const confirmation = window.confirm(`${newName} already exists. Do you want to update the number for this contact?`)

      if(confirmation) {
        phonebookService
          .update((persons.find(person => person.name === personObject.name)).id, personObject)
          .then(returnData => {
            setPersons(persons.map(person => person.name !== personObject.name ? person : returnData))
            setMessage([`${returnData.name} has been updated`, false])
            setTimeout(() => {
              setMessage([null, false])
            }, 5000)
          })
      }

      setNewName('')
      setShowAll(true)
      setFilter('')
      return
    } 
    else {
      phonebookService
      .create(personObject)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact))
        setNewName('')
        setNewNumber('')
        setShowAll(true)
        setFilter('')

        setMessage(
          `Person '${returnedContact.name}' has been added to the list.`
        )
        setTimeout(() => {
          setMessage([null, false])
        }, 5000)

      })
    }



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
      <Notification message={message} />
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
      <RenderPhonebook persons={personsToShow} deleteContact={deleteContact} />

    </div>
  )
}

export default App
