//import mongoose
const mongoose = require('mongoose')

// create mongoose schema
const Schema = mongoose.Schema;

// create task schema
const taskSchema = new Schema({
  title: String,
  weight: Number,
  description: String,
  projectId: String
  });
  
  // create a model for the "Task" collection based on the taskSchema
  const Task = mongoose.model('Task', taskSchema);
  
  // export the model
  module.exports = Task;

  