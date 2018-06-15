'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
  
  Name: {
    type: String,
    required: true,
    unique: true
  },
  Title: {
    type: String,
    required: true,
    unique: true
  },
  Type: {
    type: String
  },
  Duration:{
    type: String
  },
  Desc:{
    type: String
  },
  Tags: {
    type: [String],
    required: false
  } 
  
});

//module.exports = mongoose.model('assignment', AssignmentSchema);

module.exports = mongoose.models.assignment || mongoose.model('assignment', AssignmentSchema);
