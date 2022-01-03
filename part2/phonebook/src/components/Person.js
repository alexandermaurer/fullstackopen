import React from 'react';

export const Person = ({ person, deleteContact }) => {
  return (
    <li>{person.name} {person.number} <button onClick={() => deleteContact(person)}>delete</button></li>
  );
};
