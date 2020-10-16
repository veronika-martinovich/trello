const isString = require('../../helpers/validation').isString;
const isNumber = require('../../helpers/validation').isNumber;
const InvalidDataError = require('../../helpers/errors').InvalidDataError;

const isTaskValid = ({ title, order, description }) => {
  if (!isString(title)) {
    throw new InvalidDataError('Invalid task title data');
  } else if (!isNumber(order)) {
    throw new InvalidDataError('Invalid task order data');
  } else if (!isString(description)) {
    throw new InvalidDataError('Invalid task description data');
  }
};

module.exports = isTaskValid;
