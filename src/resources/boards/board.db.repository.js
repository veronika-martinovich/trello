const Board = require('./board.model');

const getAll = async () => Board.find({});
const save = async board => Board.create(board);
const get = async id => Board.findById(id);
const remove = async id => Board.deleteOne({ _id: id });
const update = async (id, board) => {
  await Board.updateOne({ _id: id }, board);
  return get(id);
};

module.exports = { getAll, save, get, remove, update };
