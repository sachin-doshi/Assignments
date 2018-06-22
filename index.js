var config = require('./server/config/config');
var app = require('./server/server.js');
var logger= require('./server/util/logger');


app.listen(config.port);

logger.log('listening on http://localhost:' + config.port);

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
  });