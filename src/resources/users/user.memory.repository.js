const DB = require('../../common/inMemoryDb');
const TABLE_NAME = 'Users';

const getAll = async () => {
  return await DB.getAllEntities(TABLE_NAME);
};

const get = async id => {
  const entity = await DB.getEntity(TABLE_NAME, id);
  if (!entity) {
    throw new Error(`Couldn't find user with id: ${id}`);
  }
  return entity;
};

const update = async (id, user) => {
  const entity = await DB.updateEntity(TABLE_NAME, id, user);
  if (!entity) {
    throw new Error(`Couldn't find user with id: ${id}`);
  }
  return entity;
};

const remove = async id => {
  const entity = await DB.removeEntity(TABLE_NAME, id);
  if (!entity) {
    throw new Error(`Couldn't find user with id: ${id}`);
  }
  return entity;
};

const save = async user => {
  return await DB.saveEntity(TABLE_NAME, user);
};

module.exports = { getAll, get, update, remove, save };
