const DB = require('../../common/inMemoryDb');
const TABLE_NAME = 'Users';
const NotFoundError = require('../../helpers/errors').NotFoundError;

const getAll = async () => {
  const entities = await DB.getAllEntities(TABLE_NAME);
  if (!entities) {
    throw new NotFoundError("Couldn't find users");
  }
  return entities;
};

const get = async id => {
  const entity = await DB.getEntity(TABLE_NAME, id);
  if (!entity) {
    throw new NotFoundError(`Couldn't find user with id: ${id}`);
  }
  return entity;
};

const update = async (id, user) => {
  const entity = await DB.updateEntity(TABLE_NAME, id, user);
  if (!entity) {
    throw new NotFoundError(`Couldn't find user with id: ${id}`);
  }
  return entity;
};

const remove = async id => {
  const entity = await DB.removeEntity(TABLE_NAME, id);
  if (!entity) {
    throw new NotFoundError(`Couldn't find user with id: ${id}`);
  }
  return entity;
};

const save = async user => {
  return await DB.saveEntity(TABLE_NAME, user);
};

module.exports = { getAll, get, update, remove, save };
