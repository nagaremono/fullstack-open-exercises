import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Filter';
import NewPersonForm from './NewPersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [inputFields, setInputFields] = useState({
    newName: '',
    newNumber: '',
    search: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => setPersons(response.data));
  }, []);

  const handleInputChange = (event) => {
    setInputFields({
      ...inputFields,
      // Input names is passed down as props to lower components
      [event.target.name]: event.target.value,
    });
  };

  const addPerson = (event) => {
    event.preventDefault();

    const samePersons = persons.filter(
      (person) => person.name === inputFields.newName
    );

    if (samePersons.length > 0) {
      return alert(`${samePersons[0].name} is already added to the phonebook`);
    }

    const newPerson = {
      name: inputFields.newName,
      number: inputFields.newNumber,
    };

    setPersons(persons.concat(newPerson));
    setInputFields({
      ...inputFields,
      newName: '',
      newNumber: '',
    });
  };

  const personsToShow =
    inputFields.search === ''
      ? persons
      : persons.filter((person) => {
          return person.name
            .toLowerCase()
            .includes(inputFields.search.toLowerCase());
        });

  return (
    <div className="phonebook">
      <h1>PhoneBook</h1>
      <Filter inputFields={inputFields} handleInputChange={handleInputChange} />
      <NewPersonForm
        inputFields={inputFields}
        handleInputChange={handleInputChange}
        addPerson={addPerson}
        // Input names are the keys in the inputFields state
        inputNames={{ name: 'newName', number: 'newNumber' }}
      />
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
