const express = require('express');
const { celsiusToFahrenheit } = require('./src/index'); 
const app = express();
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'running',
    message: 'Temperature Converter API is operational',
    endpoints: {
      convert: 'POST /convert'
    }
  });
});

// Conversion endpoint
app.post('/convert', (req, res) => {
  const { celsius } = req.body;

  if (celsius === undefined) {
    return res.status(400).json({ error: "celsius is required" });
  }
  
  if (typeof celsius !== 'number') {
    return res.status(400).json({ error: "celsius must be a number" });
  }
  
  const fahrenheit = celsiusToFahrenheit(celsius);
  res.json({ fahrenheit });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}