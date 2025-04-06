// server.js
const express = require('express');
const { celsiusToFahrenheit } = require('./src/index'); 
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Temperature Converter API is running');
});

// Your temperature converter as an API
app.post('/convert', (req, res) => {
  const { celsius } = req.body;

  if (celsius === undefined) {
    return res.status(400).json({ error: "celsius is required" });
  }
  // Input validation check if its a number
  if (typeof celsius !== 'number') {
    return res.status(400).json({ error: "celsius must be a number" });
  }
  const fahrenheit = celsiusToFahrenheit(celsius);
  res.json({ fahrenheit });
});

// Export app without listening
module.exports = app;

// Only start server if run directly (not in tests)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// After all your routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});