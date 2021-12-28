import React from 'react';

export const Filter = ({ filter, handleFilter }) => {
  return (
    <form>
      <div>filter by name: <input value={filter} onChange={handleFilter} /></div>
    </form>
    )};