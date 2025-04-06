const request = require('supertest');
const app = require('../server'); // Your new Express app
const server = app.listen(); // Random port for testing

afterAll((done) => {
  server.close(done); // Properly close server
});

describe('Temperature API', () => {
  test("0°C returns 32°F via API", async () => {
    const response = await request(app)
      .post('/convert')
      .send({ celsius: 0 });
    expect(response.body.fahrenheit).toBe(32);
  });

  test("37.5°C returns 99.5°F", async () => {
    const response = await request(server)
      .post('/convert')
      .send({ celsius: 37.5 });
    expect(response.body.fahrenheit).toBeCloseTo(99.5);
  });

  // Add other API tests here (replicating your unit tests but via HTTP)
  // Test invalid inputs
test("Returns 400 for non-numeric input", async () => {
  const response = await request(app)
    .post('/convert')
    .send({ celsius: "not_a_number" });
  expect(response.status).toBe(400);
});

// Test missing parameter
test("Returns 400 if celsius is missing", async () => {
  const response = await request(app)
    .post('/convert')
    .send({});
  expect(response.status).toBe(400);
});
});