class InvalidDataError extends Error {
  constructor(message) {
    super();
    this.statusCode = 400;
    this.message = message;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super();
    this.statusCode = 404;
    this.message = message;
  }
}

module.exports = { InvalidDataError, NotFoundError };
