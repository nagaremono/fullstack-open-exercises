import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import NewPersonForm from './NewPersonForm';
import Persons from './Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [inputFields, setInputFields] = useState({
    newName: '',
    newNumber: '',
    search: '',
  });

  useEffect(() => {
    personService
      .getAllPerson()
      .then((intialPersons) => setPersons(intialPersons));
  }, []);

  const handleInputChange = (event) => {
    setInputFields({
      ...inputFields,
      // Input names is passed down as props to lower components
      [event.target.name]: event.target.value,
    });
  };

  const updatePerson = (personToUpdate) => {
    const confirmation = window.confirm(
      `${personToUpdate.name} is already in the phonebook. Replace the old number with the new one?`
    );

    if (confirmation) {
      personService
        .updatePerson({
          ...personToUpdate,
          number: inputFields.newNumber,
        })
        .then((updatedPerson) => {
          const updatedPersons = persons.map((person) =>
            person.id === updatedPerson.id ? updatedPerson : person
          );

          setPersons(updatedPersons);
          setInputFields({
            ...inputFields,
            newName: '',
            newNumber: '',
          });
        });

      return;
    }
  };

  const addPerson = (event) => {
    event.preventDefault();

    const samePerson = persons.find(
      (person) => person.name === inputFields.newName
    );

    if (samePerson) {
      return updatePerson(samePerson);
    }

    const newPerson = {
      name: inputFields.newName,
      number: inputFields.newNumber,
    };

    personService.createPerson(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setInputFields({
        ...inputFields,
        newName: '',
        newNumber: '',
      });
    });
  };

  const deletePerson = (personToDelete) => {
    const confirmation = window.confirm(
      `Are you sure you want to delete ${personToDelete.name}?`
    );

    if (confirmation) {
      personService.deletePerson(personToDelete.id).then(() => {
        const updatedPersons = persons.filter(
          (person) => person.id !== personToDelete.id
        );
        setPersons(updatedPersons);
      });
    }
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
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
