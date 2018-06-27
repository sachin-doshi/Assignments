var mongoose = require("mongoose");
var should = require("should");
var prepare = require("./prepare");
const logger = require("../util/logger");
const model = require("./../api/Catalogs/item_model");
const catlogItem = model.CatlogItem;


mongoose.set("debug", true);

//mongoose.createConnection("mongodb://localhost:27017/catlogDB");

mongoose.connect('mongodb://localhost:27017/catlogDB');
mongoose.connection.on(
    "error",
    logger.error.bind(console, "connection error:")
  );
  mongoose.connection.once("open", function callback() {
    logger.log("---------- Database connected..");
  });


describe("CatalogItem: models", function() {
  console.log(`CatalogItem describe ...`);

  describe("#create()", () => {
    it("Should create a new CatalogItem", async function(done) {
      try {
        var item = {
          itemId: "2",
          itemName: "Bay Watch",
          price: 200,
          currency: "EUR",
          categories: ["Watches", "Sports Watches"]
        };

        const createdItem = await catlogItem.create(item);
        createdItem.itemId.should.equal("2");
        createdItem.itemName.should.equal("Bay Watch");
        createdItem.price.should.equal(200);
        createdItem.currency.should.equal("EUR");
        createdItem.categories[0].should.equal("Watches");
        createdItem.categories[0].should.equal("Sports Watches");

        //Notify mocha that the test has completed
        done();
      } catch (error) {
        console.error(error);
        done(error);
      }
    });
  });
});
