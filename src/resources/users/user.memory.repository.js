const DB = require('../../utils/inMemoryDb');
const TABLE_NAME = 'Users';

const getAll = async () => {
  return DB.getAllEntities(TABLE_NAME);
};

const get = async id => {
  const entity = await DB.getEntity(TABLE_NAME, id);
  if (!entity) {
    throw new Error(`Couldn't find user with id: ${id}`);
  }
  return entity;
};

const update = async (id, user) => {
  const entity = DB.updateEntity(TABLE_NAME, id, user);
  if (!entity) {
    throw new Error(`Couldn't find user with id: ${id}`);
  }
  return entity;
};

const remove = async id => {
  const entity = DB.removeEntity(TABLE_NAME, id);
  if (!entity) {
    throw new Error(`Couldn't find user with id: ${id}`);
  }
  return entity;
};

const save = async user => {
  return DB.saveEntity(TABLE_NAME, user);
};

module.exports = { getAll, get, update, remove, save };
