const express= require('express');
const response = require('../../network/response')
const controller =require("./controller")
const router= express.Router()



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










