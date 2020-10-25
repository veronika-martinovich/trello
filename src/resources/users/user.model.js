const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    login: String,
    password: { type: String, select: false }
  },
  { collection: 'users' }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
