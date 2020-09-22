import React from 'react';

const NewPersonForm = ({
  addPerson,
  handleInputChange,
  inputFields,
  inputNames,
}) => {
  return (
    <div className="add-contact-form">
      <h2>Add a new contact</h2>
      <form onSubmit={addPerson}>
        <div>
          <label htmlFor={inputNames.name}>Name: </label>
          <input
            onChange={handleInputChange}
            value={inputFields.newName}
            name={inputNames.name}
            id={inputNames.name}
          />
        </div>
        <div>
          <label htmlFor={inputNames.number}>Number: </label>
          <input
            onChange={handleInputChange}
            value={inputFields.newNumber}
            name={inputNames.number}
            id={inputNames.number}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default NewPersonForm;
