const apiClient = require('../utils/apiClient');

async function getPopularPosts() {
  return [{ id: 1, content: "Popular post example" }];
}

async function getLatestPosts() {
  return [{ id: 2, content: "Latest post example" }];
}

module.exports = { getPopularPosts, getLatestPosts };
