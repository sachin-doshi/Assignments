'use strict'
const router = require('express').Router();
const logger = require('../../util/logger');
const controller = require('./catalog_controller');
// const auth = require('../../auth/auth');


// lock down the right routes
router.param('id', controller.params);


router.route('/')
    .get(controller.getCatalog);

router.route('/:id')
    .delete(controller.removeItemCatlog);
  


module.exports = router;