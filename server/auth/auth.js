'use strict'
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../config/config');
const checkToken = expressJwt({ secret: config.secrets.jwt });


exports.verifyToken = function() {
  return function(req, res, next) {
    const api_Key = req.query.api_key ;

    if (!api_Key) {
      res.status(400).send('You need to send an key in header to access an API!');
      return;
    }

     if (api_Key!== config.api_key) {
            res.status(401).send('Unauthorized - Correct API Key is required to Access API');
     }else{      
          next();
     }   
  };
};