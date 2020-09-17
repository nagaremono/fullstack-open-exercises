import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './Country';
import CountryList from './CountryList';

const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [countries, setCountries] = useState([]);
  const [viewedCountry, setViewedCountry] = useState(null);

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data));
  }, []);

  const countriesToShow =
    searchInput === ''
      ? countries
      : countries.filter((country, index) => {
          country.index = index;
          return country.name.toLowerCase().includes(searchInput.toLowerCase());
        });

  const viewCountry = (event) => {
    setViewedCountry(countries[event.target.dataset.index]);
  };

  return (
    <div className="App">
      <h1>Data for Countries</h1>
      <form>
        <label>Find countries by name </label>
        <input onChange={handleChange} value={searchInput} />
      </form>
      {countriesToShow.length > 10 && (
        <p>Too many matches, please specify another filter</p>
      )}
      {(countriesToShow.length === 1 && (
        <Country country={countriesToShow[0]} />
      )) ||
        (countriesToShow.length > 0 && countriesToShow.length <= 10 && (
          <>
            <CountryList
              countries={countriesToShow}
              viewCountry={viewCountry}
            />
            {viewedCountry && <Country country={viewedCountry} />}
          </>
        ))}
    </div>
  );
};

export default App;
