import React from 'react';

const Person = ({ person, deletePerson }) => {
  return (
    <li>
      {person.name} {person.number}
      <button className="delete-button" onClick={() => deletePerson(person)}>
        Delete
      </button>
    </li>
  );
};

const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <div>
      <h2>Numbers</h2>
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
