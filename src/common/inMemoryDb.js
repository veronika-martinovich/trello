const db = {
  Users: [],
  Boards: []
};

const getAllEntities = async tableName => {
  return db[tableName];
};

const getEntity = async (tableName, id) => {
  const entities = db[tableName].filter(item => item.id === id);

  if (entities.length > 1) {
    console.error(
      `The DB data is damaged. Table: ${tableName}. Entity ID: ${id}`
    );
    throw Error('The DB data is damaged.');
  }
  return entities[0];
};

const updateEntity = async (tableName, id, entity) => {
  const oldEntity = await getEntity(tableName, id);
  if (oldEntity) {
    db[tableName][db[tableName].indexOf(oldEntity)] = {
      ...oldEntity,
      ...entity
    };
  }
  return await getEntity(tableName, id);
};

const removeEntity = async (tableName, id) => {
  const entity = await getEntity(tableName, id);
  const index = db[tableName].indexOf(entity);
  db[tableName] = [
    ...db[tableName].slice(0, index),
    ...(db[tableName].length - 1 > index ? db[tableName].slice(index + 1) : [])
  ];
  return entity;
};

const saveEntity = async (tableName, entity) => {
  db[tableName].push(entity);
  return getEntity(tableName, entity.id);
};

module.exports = {
  getAllEntities,
  getEntity,
  updateEntity,
  removeEntity,
  saveEntity
};
