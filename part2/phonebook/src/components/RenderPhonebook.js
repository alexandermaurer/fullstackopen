import React from 'react';
import { Person } from "./Person";

export const RenderPhonebook = ({ persons }) => {
  return (
    <ul>
      {persons.map(person => <Person key={person.name} person={person} />
      )}
    </ul>
  );
};
