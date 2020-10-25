const mongoose = require('mongoose');
const { Schema } = mongoose;

const boardSchema = new Schema(
  {
    title: String,
    columns: Array
  },
  { collection: 'boards' }
);

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
