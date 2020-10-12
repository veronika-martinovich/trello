const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const getAllByUser = userId => tasksRepo.getAllByUser(userId);

const getById = (boardId, taskId) => tasksRepo.getById(boardId, taskId);

const update = (id, task) => tasksRepo.update(id, task);

const remove = id => tasksRepo.remove(id);

const save = task => tasksRepo.save(task);

module.exports = { getAll, getAllByUser, getById, update, remove, save };
