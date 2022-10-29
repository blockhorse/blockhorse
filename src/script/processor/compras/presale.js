//const Model= require('../../../components/hivepay/models.js')
const store= require('../../../components/hivepay/store.js')

async function get_pays(){
let data={ checked: "false"  }
return res= await store.get(data)
}


async function check_pay(param){
	console.log("param check pay", param);
data={
  "version": 2,
  "ipn_verification": true,
  "txid": "c9db8c6cd3995405a557effe42800e30fedc02f5",
  "merchant": "blainjones",
  "buyer": "someaccount",
  "token": "HIVE",
  "token_amount": "0.603",
  "fee": "0.002",
  "amount_received": "0.601"
}


const response = await fetch("https://api.hivepay.io/", {
method: 'POST',
headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
},
body: `{
  "version": 2,
  "ipn_verification": true,
  "txid": "c9db8c6cd3995405a557effe42800e30fedc02f5",
  "merchant": "blainjones",
  "buyer": "someaccount",
  "token": "HIVE",
  "token_amount": "0.603",
  "fee": "0.002",
  "amount_received": "0.601"
}`,
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




