const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: ['id', 'name', 'score'],
    });
    res.send(user);
  } catch (error) {
    console.error(error);
  }
});

router.put('/plus', async (req, res) => {
  try {
    const exUser = await User.findOne({
      where: { id: req.body.nameId },
    });
    if (!exUser) {
      return res.send({ result: '아이디가 없습니다.' });
    }
    exUser.update({
      score: req.body.score,
    });
    return res.status(200).send({ result: 'YES' });
  } catch (error) {
    console.error(error);
  }
});

router.put('/minus', async (req, res) => {
  try {
    const exUser = await User.findOne({
      where: { id: req.body.nameId },
    });
    if (!exUser) {
      return res.send({ result: '아이디가 없습니다.' });
    }
    exUser.update({
      score: req.body.score,
    });
    return res.status(200).send({ result: 'YES' });
  } catch (error) {
    console.error(error);
  }
});

router.get('/draw', async (req, res) => {
  const user = await User.findAll({
    attributes: ['name', 'score'],
    order: [['score', 'DESC']],
    limit: 10,
  });
  res.status(200).send(user);
});

module.exports = router;
