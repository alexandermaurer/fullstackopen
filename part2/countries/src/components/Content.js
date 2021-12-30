import React from 'react';
import { RenderCountryData } from "./RenderCountryData";

export const Content = ({ countries, filterToCountry }) => {
  console.log(countries);
  if (countries.length > 10) {
    return (
      <div><p>Too many matches.</p></div>
    );
  } else if (countries.length === 0) {
    return (
      <div><p>No match.</p></div>
    );
  }
  else if (countries.length === 1) {
    return (
      <RenderCountryData country={countries[0]} />
    );
  } else {
    return (
      <ul>
        {countries.map(country => <li key={country.alpha3Code}>
          {country.name} <button value={country.name} onClick={filterToCountry}>show</button>
        </li>)}
      </ul>
    );
  }
};
