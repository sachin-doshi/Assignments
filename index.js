var config = require('./server/config/config');
var app = require('./server/server.js');
var logger= require('./server/util/logger');


app.listen(config.port);

logger.log('listening on http://localhost:' + config.port);
