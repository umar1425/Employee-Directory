import React from 'react';

export default function Employee({ employee }) {
  const {
    picture: { thumbnail },
    name: { first, last },
    location: { country },
    email,
    dob: { age },
  } = employee;

  const name = first + ' ' + last;
  return (
    <tr>
      <td>
        <img src={thumbnail} alt={name} />
      </td>
      <td>{name}</td>
      <td>{age}</td>
      <td>{email}</td>
      <td>{country}</td>
    </tr>
  );
}
