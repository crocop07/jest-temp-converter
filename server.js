const express = require('express');
const app = express();

// Critical: Must use Heroku's PORT
const PORT = process.env.PORT || 3000;

// Required root endpoint
app.get('/', (req, res) => {
  console.log('Health check passed'); // Verify in logs
  res.status(200).send('OK');
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on ${PORT}`);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  server.close(() => {
    process.exit(0);
  });
});