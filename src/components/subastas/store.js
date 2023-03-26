require("dotenv").config();
const Auction= require('./models.js')
const MONGOUSE = process.env.MONGOUSE
URI_MD = `mongodb://${MONGOUSE}@cluster3479-shard-00-00.r5klk.mongodb.net:27017,cluster3479-shard-00-01.r5klk.mongodb.net:27017,cluster3479-shard-00-02.r5klk.mongodb.net:27017/EQUINE?ssl=true&replicaSet=atlas-ts4xhm-shard-0&authSource=admin&retryWrites=true&w=majority&readPreference=primary`
 const db = require('mongoose');

db.connect(URI_MD, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function getAuction(itemId) {
  return await Auction.find();
}

async function getOne(itemId) {
  return await Auction.findOne({itemId : itemId});
}

async function saveAuction(id, auction) {
  console.log("Store :auction", auction);
  return await Auction.findByIdAndUpdate(id, auction);
}

async function newAuction(auction) {

const newAuction = new Auction(auction);
console.log(" Store :newAuction", newAuction);
return await newAuction.save();
}







module.exports = {
  getAuction,
  getOne,
  saveAuction,
  newAuction,
};

// module.exports = {
//   getAuction,
//   saveAuction,
// };
