const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const getById = (boardId, taskId) => tasksRepo.getById(boardId, taskId);

const update = (id, task) => tasksRepo.update(id, task);

const remove = id => tasksRepo.remove(id);

const save = task => tasksRepo.save(task);

module.exports = { getAll, getById, update, remove, save };
