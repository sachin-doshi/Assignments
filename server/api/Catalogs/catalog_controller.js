"use strict";
const _ = require("lodash");
const logger = require("../../util/logger");
const redis = require("redis");
const redisURL = "redis://127.0.0.1:6379";
const redisClient = redis.createClient(redisURL);
const util = require("util");
const Item = require("./item_model");

redisClient.get = util.promisify(redisClient.get);

exports.params = async function(req, res, next, id) {
  //Redis impementation
  try {
    const cachedItem = await redisClient.get(id);
    if (cachedItem) {
      req.Item = JSON.parse(cachedItem);
      next();
    } else {
      const item = await Item.findOne({itemId: id}).exec();
      if (!item) {
        next(new Error("Invalid CatlogItem ID supplied"));
      } else {
        redisClient.set(id, JSON.stringify(item));
        req.Item = item;
        next();
      }
    }
  } catch (err) {
    next(err);
  }
};

exports.getCatalog = async function(req, res, next) {
  res.format({
    text: function() {
      res.send("hey");
    },

    html: function() {
      res.send("<p>hey</p>");
    },

    json: function() {
      res.send({ message: "hey" });
    }
  });
};

exports.removeItemCatlog = async function(req, res, next) {
  try {
        const item = req.Item;
        console.log("Deleting item with id" + item.itemId);
        await item.remove()
        res.status(200).send("Sucessfully Deleted");
    // const item = await CatlogItem.findOne({ itemId: id });
    // if (!item) {
    //   res.status(404).send("Id not found");
    // } else {
    //   item.remove();
    //   res.status(200).send("Sucessfully Deleted");
    // }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
