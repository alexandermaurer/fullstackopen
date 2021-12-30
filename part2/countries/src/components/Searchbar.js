import React from 'react';

export const Searchbar = ({ search, handleFilter }) => {
  return (
    <div>
      <form>
        <div>Search for country: <input value={search} onChange={handleFilter} /></div>
      </form>
    </div>
  );
};
