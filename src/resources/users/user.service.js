const usersRepo = require('./user.db.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const update = (id, user) => usersRepo.update(id, user);

const remove = async id => {
  await usersRepo.remove(id);
  const tasksToUpdate = await tasksService.getAllByUser(id);
  tasksToUpdate.forEach(
    async task => await tasksService.update(task.id, { userId: null })
  );
  return;
};

const save = user => usersRepo.save(user);

module.exports = { getAll, get, update, remove, save };
