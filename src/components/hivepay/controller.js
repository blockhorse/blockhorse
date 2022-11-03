const store = require('./store.js');


async function add_hivepay_notification(body){
return new Promise((resolve, reject)=> {

console.log("body notificacion desde hive",body)


let data={
    txid: body.payment_details.txid,
    payment_successful: body.payment_details.payment_successful,
    merchant: body.payment_details.merchant,
    buyer: body.payment_details.buyer,
    token: body.payment_details.token,
    token_amount: body.payment_details.token_amount,
    amount_received: body.payment_details.amount_received,
    fee: body.payment_details.fee,
    item_name: body.item_name,
    item_tax: body.item_tax,
    hp_memo: body.hp_memo,
    quantity: body.quantity,
    description: body.description,
    hivepaytype: body.hivepaytype, 
    discount_token:body.discount_token,
    discount_amount:body.discount_amount,
    insert_id:body.insert_id,
    third_party:  body.third_party,
    third_party_percent:body.third_party_memo, 
    third_party_memo: body.third_party_percent,

    }


console.log("data", data);

//console.log("menssage body", body);

resolve(store.add(data))

})

}


async function get_hivepay_notification(body){
 return new Promise((resolve,reject) =>{

  resolve(store.get())



console.log("menssage body desde get hive pay", body);


 })
}


module.exports = {
add_pay : add_hivepay_notification,
 get_hivepay_notification,
}