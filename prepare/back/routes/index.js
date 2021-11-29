const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const user = await User.findAll({
      // attributes: ['name', 'temperature', 'createdAt'],
    });
    res.status(201).send(user);
  } catch (error) {
    console.error(error);
  }
});

router.post('/join', async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
  }
});

router.put('/update', async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.body.nameId },
    });

    console.log(user, 'user');
    if (!user) {
      return res.send({ result: 'notExist', data: '아이디가 없습니다' });
    }

    if (user.name === req.body.updateName) {
      return res.send({
        result: 'notExist',
        data: '바꾸려는 이름과 이전 같습니다.',
      });
    }
    await user.update(
      {
        name: req.body.updateName,
      },
      { where: { id: req.body.nameId } },
    );
    res.status(201).send({ result: 'ok' });
  } catch (error) {
    console.error(error);
  }
});

router.delete('/destory', async (req, res) => {
  try {
    await User.destroy({
      where: { id: req.body.nameId },
    });
    res.send({ result: 'success' });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
