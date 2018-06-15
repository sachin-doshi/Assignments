'use strict'
const router = require('express').Router();

// api router will mount other routers
router.use('/Assignment', require('./Assignment/assignment_routes'));

module.exports = router;
