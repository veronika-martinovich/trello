const mongoose = require('mongoose');
const { Schema } = mongoose;
const toJson = require('@meanie/mongoose-to-json');

const userSchema = new Schema(
  {
    name: String,
    login: String,
    password: { type: String, select: false }
  },
  { collection: 'users' }
);

userSchema.plugin(toJson);

const User = mongoose.model('User', userSchema);

module.exports = User;
