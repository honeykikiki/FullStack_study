const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  const user = await User.findAll({
    // attributes: ['name', 'temperature', 'createdAt'],
  });
  res.status(201).send(user);
});

router.post('/join', async (req, res) => {
  const exUser = await User.findOne({
    where: { name: req.body.name },
  });

  if (exUser) {
    return res
      .status(200)
      .send({ result: 'not', data: '같은 아이디가 있습니다' });
  }

  const user = await User.create({
    name: req.body.name,
    temperature: req.body.temperature,
  });
  res.status(201).send(user);
});

module.exports = router;
