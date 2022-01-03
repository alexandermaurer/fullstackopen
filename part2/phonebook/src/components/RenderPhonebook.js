import React from 'react';
import { Person } from "./Person";

export const RenderPhonebook = ({ persons, deleteContact }) => {
  return (
    <ul>
      {persons.map(person => <Person key={person.name} person={person} deleteContact={deleteContact} />
      )}
    </ul>
  );
};
