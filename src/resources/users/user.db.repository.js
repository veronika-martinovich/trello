const User = require('./user.model');

const getAll = async () => User.find({});
const save = async user => {
  const newUser = await User.create(user);
  return get(newUser._id);
};
const get = async id => User.findById(id);
const remove = async id => User.deleteOne({ _id: id });
const update = async (id, user) => {
  await User.updateOne({ _id: id }, user);
  return get(id);
};

module.exports = { getAll, save, get, remove, update };
