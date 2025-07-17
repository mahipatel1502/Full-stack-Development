import React, { useState } from 'react';

const CounterApp = () => {
  const [count, setCount] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);
  const handleReset = () => setCount(0);
  const handleIncrementFive = () => setCount(count + 5);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Count: {count}</h1>

      <div style={{ marginBottom: '20px' }}>
        <button style={buttonStyle} onClick={handleIncrement}>Increment</button>{' '}
        <button style={buttonStyle} onClick={handleDecrement}>Decrement</button>{' '}
        <button style={buttonStyle} onClick={handleReset}>Reset</button>{' '}
        <button style={buttonStyle} onClick={handleIncrementFive}>Increment 5</button>
      </div>
      <h1>Welcome to CHARUSAT!!!!</h1>
      <div>
        <label>First Name:  </label>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        /><br/><br/>
        <label>Last Name:  </label>
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </div>

      <h3>
        <p>First Name :  {firstName}</p>  
        <p>Last Name : {surname}</p>
      </h3>
    </div>
  );
};



const buttonStyle = {
 cursor:'pointer',
};
/* CounterApp.css */



export default CounterApp;
