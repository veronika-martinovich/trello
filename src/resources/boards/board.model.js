const mongoose = require('mongoose');
const { Schema } = mongoose;
const toJson = require('@meanie/mongoose-to-json');

const boardSchema = new Schema(
  {
    title: String,
    columns: Array
  },
  { collection: 'boards' }
);

boardSchema.plugin(toJson);

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
