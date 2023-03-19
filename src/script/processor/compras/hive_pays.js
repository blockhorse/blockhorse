//const Model= require('../../../components/hivepay/models.js')
const store= require('../../../components/hivepay/store.js')

async function get_pays(){
let data={ checked: "false"  }
return res= await store.get(data)
}


async function check_pay(param){
	//console.log("param check pay", param);
vendedor="ihalangels"// se usa para confirmar que el pago fue a esta cuenta
data={
  "version": 2,
  "ipn_verification": true,
  "txid": param[0].txid,
  "merchant": vendedor,
  "buyer": param[0].buyer,
  "token": param[0].token,
  "token_amount":param[0].token_amount,
  "fee": param[0].fee,
  "amount_received": param[0].amount_received
}

const response = await fetch("https://api.hivepay.io/", {
method: 'POST',
headers: {
  'Accept':'application/json',
  'Content-Type': 'application/json'
},
body:JSON.stringify(data),
});


response.json().then(data => {
 console.log(data.errors);

  if(data.errors==[ 'No transactions found that match that criteria' ]){
  	console.log("transactions Invalidada")
  }else{  

    //console.log("DATATA",data);
    if(data.verify_hivepay===true){
      console.log("CONFIRMACION DE PAGO")
      console.log("DATOS",data);
   
let aprovado={txid: data.verify_txid, checked: "pagado_en_hive_pay"  }
store._check_pay(aprovado)



    }


}

});
}






module.exports={
	get_pays,
	check_pay,
}







