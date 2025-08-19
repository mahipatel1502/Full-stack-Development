// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON (optional for future use)
app.use(express.json());

// Basic /home route
app.get('/home', (req, res) => {
  res.send('<h1>Welcome to the Dashboard!</h1><p>This will be your future app home page.</p>');
});

// Root route for testing
app.get('/', (req, res) => {
  res.send('<h2>Server is running. Visit /home to see the dashboard.</h2>');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
