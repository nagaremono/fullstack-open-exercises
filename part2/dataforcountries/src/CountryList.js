import React from 'react';

const CountryList = ({ countries, viewCountry }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>
          {country.name}{' '}
          <button data-index={country.index} onClick={viewCountry}>
            Show Country
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
