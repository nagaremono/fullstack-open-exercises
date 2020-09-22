import React from 'react';

const Filter = ({ inputFields, handleInputChange }) => {
  return (
    <form className="filter">
      <div>
        <label htmlFor="search">Filter person by name:{' '}</label>
        <input
          value={inputFields.search}
          onChange={handleInputChange}
          name="search"
          id="search"
        />
      </div>
    </form>
  );
};

export default Filter;
