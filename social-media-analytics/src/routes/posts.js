const express = require('express');
const router = express.Router();
const { getPopularPosts, getLatestPosts } = require('../services/postService');

router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    if (type === 'popular') {
      const posts = await getPopularPosts();
      res.json(posts);
    } else if (type === 'latest') {
      const posts = await getLatestPosts();
      res.json(posts);
    } else {
      res.status(400).json({ error: 'Invalid type parameter' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
