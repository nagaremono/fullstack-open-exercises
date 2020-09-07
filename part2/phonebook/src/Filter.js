import React from 'react';

const Filter = ({ inputFields, handleInputChange }) => {
  return (
    <form>
      <div>
        Filter person by name:{' '}
        <input
          value={inputFields.search}
          onChange={handleInputChange}
          name="search"
        />
      </div>
    </form>
  );
};

export default Filter;
