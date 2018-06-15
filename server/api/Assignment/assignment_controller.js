'use strict'
const Assignment = require('./assignment_model');
const _ = require('lodash');
const logger = require('../../util/logger');

exports.params = function(req, res, next, id) {
  Assignment.findById(id)
    .exec()
    .then(function(assignment) {
      if (!assignment) {
          next(new Error('Invalid Assignment ID supplied'));
      } else {
        req.assignment = assignment;
        next();
      }
    }, function(err) {
      next(err);
    });
};

//Get Assignment by its Object ID
exports.getOne = function(req, res, next) {
  const assignment = req.assignment;
  res.json(assignment);
};

// Search all Assignments by tags
exports.getAssignmentsByTags = function(req, res, next) {
  Assignment.find({ Tags: { $all: req.query.tags } })
    .exec()
    .then(function(assignment){
      res.json(assignment);
    }, function(err){
      next(err);
    });
  
};

//Get all Assignments
exports.get = function(req, res, next) {
  Assignment.find({})
    .exec()
    .then(function(assignment){
      res.json(assignment);
    }, function(err){
      next(err);
    });
};

exports.put = function(req, res, next) {
  const assignment = req.assignment;
  const update = req.body;
  _.merge(assignment, update);
  post.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  const newAssignment = req.body;
  Assignment.create(newAssignment)
    .then(function(assignment) {
      res.json(assignment);
    }, function(err) {
      logger.error(err);
      if(err.message.startsWith('E11000 duplicate key error collection')){
        err.status = 409;
        err.message = 'Duplicate key error'
      }      
      next(err);
    });
};

exports.delete = function(req, res, next) {
  req.assignment.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
