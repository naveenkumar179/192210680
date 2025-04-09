const axios = require('axios');
require('dotenv').config();

const apiClient = axios.create({
  baseURL: process.env.TEST_SERVER_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
  },
});

module.exports = apiClient;
