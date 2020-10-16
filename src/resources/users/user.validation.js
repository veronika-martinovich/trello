const isString = require('../../helpers/validation').isString;
const InvalidDataError = require('../../helpers/errors').InvalidDataError;

const isUserValid = ({ name, login, password }) => {
  if (!isString(name)) {
    throw new InvalidDataError('Invalid user name data.');
  } else if (!isString(login)) {
    throw new InvalidDataError('Invalid user login data.');
  } else if (!isString(password)) {
    throw new InvalidDataError('Invalid user password data.');
  }
};

module.exports = isUserValid;
