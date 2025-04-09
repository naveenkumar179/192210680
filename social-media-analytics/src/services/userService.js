const apiClient = require('../utils/apiClient');

async function getTopUsers() {
  const response = await apiClient.get('/users');
  const users = response.data.users;
  // Dummy implementation for example
  return Object.entries(users).slice(0, 5).map(([id, name]) => ({ id, name }));
}

module.exports = { getTopUsers };
