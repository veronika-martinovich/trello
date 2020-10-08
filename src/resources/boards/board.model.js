const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'TITLE', columns = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
