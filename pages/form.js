// index.html
import { useState } from 'react';
import Link from 'next/link';


function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}


export default function Form() {
const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: event.target.name.value,
      email: event.target.email.value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = '/api/form';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);

    const result = await response.json();
    alert(`Your name and e-mail: ${result.data}`);
  };
  return (
  <div>
    <Link href="/">index</Link>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" required />
 
      <label htmlFor="email">e-mail</label>
      <input type="text" id="email" name="email" required />
 
      <button type="submit">Submit</button>
    </form>
	</div>
  );

}
