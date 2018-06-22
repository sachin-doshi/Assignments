'use strict'
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
// setup global middleware here

module.exports = function(app) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());

  // catch 404 and forward to error handler
  app.use(function(req, res, next) 
  {   
    var err = new Error('Not Found');   
    err.status = 404;   
    next(err);
  });
  
};
