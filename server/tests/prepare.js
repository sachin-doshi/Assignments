var mongoose = require("mongoose");
const config = require("../config/config");

beforeEach(function(done) {
    
console.log("In Prepare Before each");

  function clearDatabase() {
    for (let i in mongoose.connections.collections) {
      mongoose.connection.collections[i].remove();
    }
    return done();
  }

  if (mongoose.connection.readyState === 0) {
    //const ret = await mongoose.connect(config.db.url + 'testCatalogs');
    mongoose.connect(
      config.db.test,
      function(err) {
        if (err) {
          throw err;
        }
        return clearDatabase();
      }
    );
  } else {
    return clearDatabase();
  }
});

afterEach(function(done) {
    console.log("In Prepare After each");
  mongoose.disconnect();
  return done();
});
