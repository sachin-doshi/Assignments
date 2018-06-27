'use strict'
const router = require('express').Router();
const logger = require('../../util/logger');
const controller = require('./assignment_controller');
const auth = require('../../auth/auth');


// lock down the right routes
router.param('id', controller.params);

router.route('/findByTags')
  .get(controller.getAssignmentsByTags)

router.route('/')
  .get(controller.get)
  .post(controller.post)
  .put(controller.put)

router.route('/:id')
  .get(controller.getOne)  
  .delete(controller.delete)


  

module.exports = router;
