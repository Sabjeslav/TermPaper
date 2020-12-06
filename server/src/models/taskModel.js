const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String
  },
  isDone: {
    type: Boolean
  },
  date: { 
    type: String,
  },
})
const TaskModel = mongoose.model('tasks', TaskSchema)
module.exports = TaskModel
