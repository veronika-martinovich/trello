const DB = require('../../common/inMemoryDb');
const TABLE_NAME = 'Boards';

const getAll = async () => {
  return await DB.getAllEntities(TABLE_NAME);
};

const get = async id => {
  const entity = await DB.getEntity(TABLE_NAME, id);
  if (!entity) {
    throw new Error(`Couldn't find board with id: ${id}`);
  }
  return entity;
};

const update = async (id, board) => {
  const entity = await DB.updateEntity(TABLE_NAME, id, board);
  if (!entity) {
    throw new Error(`Couldn't find board with id: ${id}`);
  }
  return entity;
};

const remove = async id => {
  const entity = await DB.removeEntity(TABLE_NAME, id);
  if (!entity) {
    throw new Error(`Couldn't find board with id: ${id}`);
  }
  return entity;
};

const save = async board => {
  return await DB.saveEntity(TABLE_NAME, board);
};

module.exports = { getAll, get, update, remove, save };
