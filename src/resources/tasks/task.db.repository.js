const DB = require('../../common/inMemoryDb');
const TABLE_NAME = 'Tasks';
const NotFoundError = require('../../helpers/errors').NotFoundError;

const getAll = async paramId => {
  const PARAM_NAME = 'boardId';
  const entities = await DB.getAllEntitiesByParam(
    TABLE_NAME,
    PARAM_NAME,
    paramId
  );
  if (!entities) {
    throw new NotFoundError("Couldn't find tasks by board");
  }
  return entities;
};

const getAllByUser = async userId => {
  const PARAM_NAME = 'userId';
  const entities = await DB.getAllEntitiesByParam(
    TABLE_NAME,
    PARAM_NAME,
    userId
  );
  if (!entities) {
    throw new NotFoundError("Couldn't find tasks by user");
  }
  return entities;
};

const getById = async (boardId, taskId) => {
  const entity = await DB.getEntity(TABLE_NAME, taskId);
  if (!entity) {
    throw new NotFoundError(`Couldn't find task with id: ${taskId}`);
  }
  return entity;
};

const update = async (id, task) => {
  const entity = await DB.updateEntity(TABLE_NAME, id, task);
  if (!entity) {
    throw new NotFoundError(`Couldn't find task with id: ${id}`);
  }
  return entity;
};

const remove = async id => {
  const entity = await DB.removeEntity(TABLE_NAME, id);
  if (!entity) {
    throw new NotFoundError(`Couldn't find task with id: ${id}`);
  }
  return entity;
};

const save = async task => {
  return await DB.saveEntity(TABLE_NAME, task);
};

module.exports = { getAll, getAllByUser, getById, update, remove, save };
