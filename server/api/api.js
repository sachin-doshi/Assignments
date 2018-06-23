'use strict'
const singleton = require('./singletonModuleTest');
const router = require('express').Router();

// api router will mount other routers
router.use('/assignment', require('./Assignment/assignment_routes'));

router.use('/catalogs', require('./Catalogs/catalog_routes'));

console.log(`Singleton i on api.js  = >> ${singleton.getCounter()}`);

module.exports = router;
