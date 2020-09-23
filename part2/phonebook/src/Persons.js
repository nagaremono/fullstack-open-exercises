import React from 'react';

const Person = ({ person, deletePerson }) => {
  return (
    <li>
      <span>{person.name}</span>
      <span>{person.number}</span>
      <button className="delete-button" onClick={() => deletePerson(person)}>
        Delete
      </button>
    </li>
  );
};

const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <div className="persons-list">
      <h2>Contacts</h2>
      <ul>
        {personsToShow.map((person) => (
          <Person
            key={person.name}
            person={person}
            deletePerson={deletePerson}
          />
        ))}
      </ul>
    </div>
  );
};

export default Persons;
