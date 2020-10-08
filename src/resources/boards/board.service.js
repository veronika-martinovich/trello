const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const update = (id, board) => boardsRepo.update(id, board);

const remove = id => boardsRepo.remove(id);

const save = board => boardsRepo.save(new Board(board));

module.exports = { getAll, get, update, remove, save };
