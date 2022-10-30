//const Model= require('../../../components/hivepay/models.js')
const store= require('../../../components/hivepay/store.js')

async function get_pays(){
let data={ checked: "false"  }
return res= await store.get(data)
}


async function check_pay(param){
	console.log("param check pay", param);
	console.log("param check pay trx", param.txid);
	console.log("param check pay trx", param[0].txid);

data={
  "version": 2,
  "ipn_verification": true,
  "txid": param[0].txid,
  "merchant": param[0].merchant,
  "buyer": param[0].buyer,
  "token": param[0].token,
  "token_amount":param[0].token_amount,
  "fee": param[0].fee,
  "amount_received": param[0].amount_received
}
 
 console.log(data)


const response = await fetch("https://api.hivepay.io/", {
method: 'POST',
headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
},
body: data,
});

response.json().then(data => {
  console.log(data);
   console.log(data.errors);

  if(data.errors==[ 'No transactions found that match that criteria' ]){
  	console.log("transactions Invalidada")
  }
});
}

module.exports={
	get_pays,
	check_pay,
}




