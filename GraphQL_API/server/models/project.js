//import mongoose
const mongoose = require('mongoose')

// create mongoose schema
const Schema = mongoose.Schema;

// create task schema
const projectSchema = new Schema({
  title: String,
  weight: Number,
  description: String
  });
  
  // create a model for the "Task" collection based on the projectSchema
  const Project = mongoose.model('Project', projectSchema);
  
  // export the model
  module.exports = Project;
