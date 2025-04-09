const express = require('express');
const router = express.Router();
const { getTopUsers } = require('../services/userService');

router.get('/', async (req, res) => {
  try {
    const users = await getTopUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
