const User = require('../schemas/user');

const findUserById = (id) => {
  return User.findById(id).exec();
};

const findAllUsers = () => {
  return User.find({}).exec();
};

const findBy = (filter) => {
  return User.findOne(filter).exec();
};

const createUser = (user) => {
  return User.create(user);
};

const removeUserById = (id) => {
  return User.findByIdAndDelete(id).exec();
};

const updateUserById = (id, update) => {
  return User.findByIdAndUpdate(id, update, { new: true }).exec();
};

module.exports = {
  findBy,
  findAllUsers,
  findUserById,
  createUser,
  removeUserById,
  updateUserById,
};
