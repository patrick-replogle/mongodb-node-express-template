const router = require('express').Router();
const User = require('../models/user');
const { removePassword } = require('../utils/removePassword');

// find user by id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findUserById(id);

    if (user) {
      res.status(200).json(removePassword(user));
    } else {
      res.status(401).json({ message: 'The specified user id does not exist' });
    }
  } catch (err) {
    next(err);
  }
});

// update user
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const user = await User.updateUserById(id, payload);

    if (user) {
      res.json(removePassword(user));
    } else {
      res.status(404).json({ message: 'The specified user id does not exist' });
    }
  } catch (err) {
    next(err);
  }
});

// delete user
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedUser = await User.removeUserById(id);

    if (removedUser) {
      res.json({
        message: 'User account successfully deleted',
        user: removePassword(removedUser),
      });
    } else {
      res.status(404).json({ message: 'The specified user id does not exist' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
