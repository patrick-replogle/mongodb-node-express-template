const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { signToken } = require('../utils/signToken');

// register a new user
router.post('/register', async (req, res, next) => {
  try {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    const newUser = await User.createUser(user);
    const token = signToken(newUser);

    res.status(201).json({ message: `Welcome ${user.username}`, token: token });
  } catch (err) {
    next(err);
  }
});

// user login route
router.post('/login', async (req, res, next) => {
  try {
    let { username, password } = req.body;
    const user = await User.findBy({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = signToken(user);

      res.status(200).json({
        id: user.id,
        username: user.username,
        message: `Welcome ${user.username}!`,
        token: token,
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
