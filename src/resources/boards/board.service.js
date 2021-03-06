const boardsRepo = require('./board.db.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const update = (id, board) => boardsRepo.update(id, board);

const remove = async id => {
  const tasksToDelete = await tasksService.getAll(id);
  tasksToDelete.forEach(async task => await tasksService.remove(task._id));
  return await boardsRepo.remove(id);
};

const save = board => boardsRepo.save(board);

module.exports = { getAll, get, update, remove, save };
