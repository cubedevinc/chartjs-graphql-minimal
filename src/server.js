require("dotenv").config();
const express = require('express');
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;

const CUBEJS_URL = process.env.CUBEJS_URL;
const CUBEJS_SECRET = process.env.CUBEJS_SECRET;

// Function to generate JWT token
function generateJwtToken() {
    const payload = {
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiration
    };
    return jwt.sign(payload, CUBEJS_SECRET, { algorithm: "HS256" });
}
  
app.use(express.static('public'));

app.get('/data', async (req, res) => {
  try {
    // Query to get the number of items created per year
    const query = `{cube{item_information{number_of_items created_at{year}}}}`;
    // Fetch data from Cube.js
    const response = await fetch(CUBEJS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: generateJwtToken(),
        },
        body: JSON.stringify({ query }),
    });
  
    const data = await response.json();
    // console.log(data.data.cube);
    res.json(data.data.cube);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});