const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const itemSchema = new Schema({
    "itemId" : {type: String , index: {unique:true}},
    "itemName": String,
    "price" : Number ,
    "currency" : String,
    "categories" : [String]
});

// const CatlogItem= mongoose.model('Item',itemSchema);

// module.exports = {CatlogItem : CatlogItem}

module.exports = mongoose.models.item || mongoose.model('item',itemSchema);