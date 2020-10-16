const isString = require('../../helpers/validation').isString;
const InvalidDataError = require('../../helpers/errors').InvalidDataError;

const validateBoard = ({ title }) => {
  if (!isString(title)) {
    throw new InvalidDataError('Invalid board title data');
  }
};

module.exports = validateBoard;
