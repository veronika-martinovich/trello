const mongoose = require('mongoose');
const { Schema } = mongoose;
const toJson = require('@meanie/mongoose-to-json');

const taskSchema = new Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String
  },
  { collection: 'tasks' }
);

taskSchema.plugin(toJson);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
