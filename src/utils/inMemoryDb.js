const db = {
  Users: []
};

const getAllEntities = tableName => {
  return db[tableName];
};

const getEntity = (tableName, id) => {
  const entities = db[tableName].filter(item => item.id === id);

  if (entities.length > 1) {
    console.error(
      `The DB data is damaged. Table: ${tableName}. Entity ID: ${id}`
    );
    throw Error('The DB data is damaged.');
  }
  return entities[0];
};

const updateEntity = (tableName, id, entity) => {
  const oldEntity = getEntity(tableName, id);
  if (oldEntity) {
    db[tableName][db[tableName].indexOf(oldEntity)] = { ...entity };
  }
  return getEntity(tableName, id);
};

const removeEntity = (tableName, id) => {
  const entity = getEntity(tableName, id);
  const index = db[tableName].indexOf(entity);
  db[tableName] = [
    ...db[tableName].slice(0, index),
    ...(db[tableName].length - 1 > index ? db[tableName].slice(index + 1) : [])
  ];
  return entity;
};

const saveEntity = (tableName, entity) => {
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
