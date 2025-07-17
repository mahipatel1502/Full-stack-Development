import React, { useState, useEffect } from 'react';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.container}>
      <h1>Welcome to CHARUSAT!!!!</h1>
      <h2>It is {currentTime.toLocaleDateString()}</h2>
      <h2>It is {currentTime.toLocaleTimeString()}</h2>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial',
    textAlign: 'center',
    marginTop: '100px',
  },
  time: {
    fontSize: '23px',
    color: '#333',
  }
};

export default App;
