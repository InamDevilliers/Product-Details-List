const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

// Define /products endpoint
app.get('/products', async (req, res) => {
  try {
    // Fetch product data from external API
    const response = await axios.get('https://dummyjson.com/products');
    res.status(200).json(response.data); // Return data to the frontend
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to retrieve products' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
