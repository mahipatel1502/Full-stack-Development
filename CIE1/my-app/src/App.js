import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [feedback, setFeedback] = useState({
    Excellent: 0,
    Good: 0,
    Average: 0,
    Poor: 0,
  });
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const clock = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(clock);
  }, []);

  useEffect(() => {
    const options = ["Excellent", "Good", "Average", "Poor"];
    const interval = setInterval(() => {
      const random = options[Math.floor(Math.random() * options.length)];
      setFeedback((prev) => ({
        ...prev,
        [random]: prev[random] + 1,
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleVote = (type) => {
    setFeedback((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
    setUserCount((prev) => prev + 1);
  };

  return (
    <div className="container">
      <h1 className="main-title">Live Event Feedback Dashboard</h1>

      <div className="section card">
        <h2>Participant Details</h2>
        <div className="input-row">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        {firstName && surname && (
          <p className="greeting">Welcome, {firstName} {surname}!</p>
        )}
      </div>

      <div className="section card">
        <h2>Current Time</h2>
        <p className="clock">{currentTime.toLocaleString()}</p>
      </div>

      <div className="section card">
        <h2>Submit Feedback</h2>
        <div className="button-group">
          {["Excellent", "Good", "Average", "Poor"].map((option) => (
            <button key={option} onClick={() => handleVote(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="section card">
        <h2>Feedback Summary</h2>
        <div className="summary-grid">
          {Object.entries(feedback).map(([key, value]) => (
            <div className="summary-box" key={key}>
              <h3>{key}</h3>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="section card">
        <h2>Feedback Count</h2>
        <p className="counter">{userCount}</p>
        <div className="button-group small">
          <button onClick={() => setUserCount(userCount + 1)}>+1</button>
          <button onClick={() => setUserCount(userCount - 1)} disabled={userCount === 0}>-1</button>
          <button onClick={() => setUserCount(0)}>Reset</button>
          <button onClick={() => setUserCount(userCount + 5)}>+5</button>
        </div>
      </div>
    </div>
  );
};

export default App;
