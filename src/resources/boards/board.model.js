const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'TITLE', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static createFromRequest(body) {
    return new Board(body);
  }
}

module.exports = Board;
