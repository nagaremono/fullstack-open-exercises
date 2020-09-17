import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
      .then((response) => {
        setWeather({
          main: response.data.weather[0].main,
          description: response.data.weather[0].description,
          temp: response.data.main.temp,
          wind: response.data.wind.speed,
        });
      });
  }, [country]);

  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <p>Subregion: {country.subregion}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((language) => {
          return <li key={language.iso639_1}>{language.name}</li>;
        })}
      </ul>
      <img className="flag" src={country.flag} alt="Country Flag"></img>
      {weather && (
        <>
          <h3>Weather in {country.name}</h3>
          <p>
            {weather.main}: {weather.description}
          </p>
          <p>Temperature: {weather.temp} &#x2103;</p>
          <p>Wind: {weather.wind} km/h</p>
        </>
      )}
    </div>
  );
};

export default Country;
