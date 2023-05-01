const express= require('express');
const response = require('../../network/response')
const controller =require("./controller")
const router= express.Router()



// router.get('/',  async function (req, res)  {
//     console.log("BODY",req)
//      controller.get_hivepay_notification(req).then((resto)=>{
//         console.log("resto", resto);
//          response.success(req, res,"todo bien",201);})

// })


router.get('/', async function (req, res) {
  
  controller.get_hivepay_notification(req).then((respuesta) => {
    console.log("respuesta", respuesta);
    response.success(req, res, respuesta, respuesta.data, 200);
  }).catch((error) => {
    response.error(req, res, 'Error al obtener notificación', error, 500);
  });
});



router.post('/', function (req, res)  {
  //console.log("BODY notification pay",req.body)
    body=JSON.stringify(req.body)
    body=JSON.parse(body)
    //console.log("body BOBOBOBOB", body);
    // console.log("body BOBOBOBOB IPNIPN", body.hivepay_ipn);

    //  res.status(200).send("mensaje");
 if(body.hivepay_ipn=='notification'){
     controller.add_pay(body)
    console.log("BODY notification pay",)
    response.success(req, res,"todo bien",200);

  }else{
      console.log("NO BODY notification pay, QUE ES?",body)
     // controller.add_pay(body)

    response.success(req, res,"todo bien",400);

  }
 

})

module.exports = router;




 // BODY {
 //   hivepay_ipn: 'notification',
 //   payment_details: {
 //     payment_successful: true,
 //     txid: '37e1b7bde51572b26d81609bd3efe21eee908e2e',
 //     merchant: 'ihalangels',
 //     buyer: 'alvarogonz',
 //     token: 'BUDS',
 //     token_amount: '137.810',
 //     fee: '0.690',
 //     amount_received: '137.120'
 //   },
 //   hp_memo:'',
 //   merchant: 'ihalangels',
 //   merchant_name: 'ihalangels',
 //   merchant_image: 'https://farm.hashkings.app/static/media/boton%20inventario.9ea5c15b.png',
 //   merchant_email: 'ihalangel@gmail.com',
 //   merchant_memo: null,
 //   base_currency: 'USD',
 //   pay_currency: 'BUDS,HIVE,HBD',
 //   amount: '0.01',
 //   item_name: 'Custom Ballo',
 //   item_image: 'https://farm.hashkings.app/static/media/Africa.19742fbb.png',
 //   item_tax: '0.01',
 //   quantity: '1',
 //   description: 'Pack 1',
 //   notify_url: 'https://www.sistemasoftware.com/payhive',
 //   return_url: 'https://www.sistemasoftware.com/',
 //   cancel_url: 'https://www.sistemasoftware.com/',
 //   cancel_url_name: 'Cancelar Ballos Buy',
 //   background: 'BUY',
 //   hivepaytype: 'purchase',
 //   discount_token: '',
 //   discount_amount: '',
 //   insert_id: '41357',
 //   third_party: null,
 //   third_party_percent: 0,
 //   third_party_memo: null
 // }







//  REAL JSON

//  {
//    "hivepay_ipn": "notification",
//    "payment_details": {
//       "payment_successful": true,
//       "txid": "37e1b7bde51572b26d81609bd3efe21eee908e2e",
//       "merchant": "ihalangels",
//       "buyer": "alvarogonz",
//       "token": "BUDS",
//       "token_amount": "137.810",
//       "fee": "0.690",
//       "amount_received": "137.120"
//    },
//    "hp_memo": "",
//    "merchant": "ihalangels",
//    "merchant_name": "ihalangels",
//    "merchant_image": "https://farm.hashkings.app/static/media/boton%20inventario.9ea5c15b.png",
//    "merchant_email": "ihalangel@gmail.com",
//    "merchant_memo": null,
//    "base_currency": "USD",
//    "pay_currency": "BUDS,HIVE,HBD",
//    "amount": "0.01",
//    "item_name": "Custom Ballo",
//    "item_image": "https://farm.hashkings.app/static/media/Africa.19742fbb.png",
//    "item_tax": "0.01",
//    "quantity": "1",
//    "description": "Pack 1",
//    "notify_url": "https://www.sistemasoftware.com/payhive",
//    "return_url": "https://www.sistemasoftware.com/",
//    "cancel_url": "https://www.sistemasoftware.com/",
//    "cancel_url_name": "Cancelar Ballos Buy",
//    "background": "BUY",
//    "hivepaytype": "purchase",
//    "discount_token": "",
//    "discount_amount": "",
//    "insert_id": "41357",
//    "third_party": null,
//    "third_party_percent": 0,
//    "third_party_memo": null
// }