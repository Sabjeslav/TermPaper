const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  description: {
    type: String
  },
  isDone: {
    type: Boolean
  }
})
const TaskModel = mongoose.model('tasks', TaskSchema)
module.exports = TaskModel
