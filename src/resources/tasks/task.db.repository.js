const Task = require('./task.model');

const getAll = async boardId => Task.find({ boardId });
const save = async task => Task.create(task);
const getById = async (boardId, taskId) => Task.findById(taskId);
const getAllByUser = async userId => Task.find({ userId });
const remove = async id => Task.deleteOne({ _id: id });
const update = async (id, task) => {
  await Task.updateOne({ _id: id }, task);
  return getById(undefined, id);
};

module.exports = { getAll, save, getById, getAllByUser, remove, update };
