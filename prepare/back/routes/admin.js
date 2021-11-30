const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: ['id', 'name', 'score'],
    });
    console.log(user);
    res.send(user);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
