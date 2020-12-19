const removePassword = (user) => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  username: user.username,
  email: user.username,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

module.exports = { removePassword };
