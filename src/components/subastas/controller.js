const store = require('./store');

async function updateAuction(itemId, bidder, newPrice, transactionId,exito) {
let auction = await store.getOne(itemId);
console.log("auction", auction);
if (!auction) {
auction = {
itemId: itemId,
startingTime: new Date(),
endingTime: new Date(Date.now() + 12 * 60 * 60 * 1000),
startingPrice: newPrice,
currentPrice: newPrice * 1.05,
highestBidder: bidder,
lastBidValue: newPrice,
lastBidder: bidder,
transactionId: transactionId,
status: "Inactive", //agrega
status_lastBid:"Add" }
return new Promise((resolve,reject) =>{
resolve(store.newAuction(auction))
});
} else { 
    console.log(exito)
    if(exito=== true){
        console.log("ENTRO")
auction.endingTime = new Date(Date.now() + 12 * 60 * 60 * 1000);
auction.currentPrice = newPrice * 1.05;
auction.highestBidder = bidder;
auction.lastBidValue = newPrice;
auction.lastBidder = bidder;
auction.transactionId = transactionId;
auction.previous_transactionId = auction.transactionId
auction.status = "Active"
auction.status_lastBid="Add";}

//return await store.saveAuction(auction);
return new Promise((resolve,reject) =>{
resolve(store.saveAuction(auction._id, auction))

 })
}


  
}





// async function updateAuction(itemId, bidder, newPrice, transactionId) {
//   let auction = await store.getAuction(itemId);
//   console.log("auction", auction);
//   if (!auction) {
//     auction = {
//       itemId: itemId,
//       startingTime: new Date(),
//       endingTime: new Date(Date.now() + 12 * 60 * 60 * 1000),
//       startingPrice: newPrice,
//       Price: [newPrice + (newPrice * 5/100)],
//       Bidder: [bidder],
//       transactionId: [transactionId],
//       ArrayStatus: [],
//       status: "Active",
//       status_lastBid: "Add"
//     }
//     return new Promise((resolve, reject) => {
//       resolve(store.newAuction(auction));
//     });
//   } else {
//     if (auction.status_lastBid === "Success") {
//       auction.endingTime = new Date(Date.now() + 12 * 60 * 60 * 1000);
//       auction.Price.push(newPrice + (newPrice * 5/100));
//       auction.Bidder.push(bidder);
//       auction.transactionId.push(transactionId);
//       auction.ArrayStatus.push(auction.status);
//       auction.status = "Active";
//       auction.status_lastBid = "Add";
//     }
//   }
//   return new Promise((resolve, reject) => {
//     resolve(store.saveAuction(auction));
//   });
// }



async function getAuctions() {

auction = {
status: "Active"
};

return new Promise((resolve,reject) =>{
resolve(store.getAuction(auction))

 })
  
}

module.exports = {
updateAuction,
getAuctions
};

