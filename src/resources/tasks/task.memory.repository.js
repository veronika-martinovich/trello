const DB = require('../../common/inMemoryDb');
const TABLE_NAME = 'Tasks';

const getAll = async paramId => {
  const PARAM_NAME = 'boardId';
  return await DB.getAllEntitiesByParam(TABLE_NAME, PARAM_NAME, paramId);
};

const getAllByUser = async userId => {
  const PARAM_NAME = 'userId';
  return await DB.getAllEntitiesByParam(TABLE_NAME, PARAM_NAME, userId);
};

const getById = async (boardId, taskId) => {
  const entity = await DB.getEntity(TABLE_NAME, taskId);
  console.log('getById', entity);
  if (!entity) {
    throw new Error(`Couldn't find task with id: ${taskId}`);
  }
  return entity;
};

const update = async (id, task) => {
  const entity = await DB.updateEntity(TABLE_NAME, id, task);
  if (!entity) {
    throw new Error(`Couldn't find task with id: ${id}`);
  }
  return entity;
};

const remove = async id => {
  const entity = await DB.removeEntity(TABLE_NAME, id);
  if (!entity) {
    throw new Error(`Couldn't find task with id: ${id}`);
  }
  return entity;
};

const save = async task => {
  console.log(task);
  return await DB.saveEntity(TABLE_NAME, task);
};

module.exports = { getAll, getAllByUser, getById, update, remove, save };
