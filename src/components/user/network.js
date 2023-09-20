const express= require('express');
const response = require('../../network/response')
const controller =require("./controller")
const router= express.Router()



router.get('/', function (req, res)  {
   var query = require('url').parse(req.url,true).query;
   console.log("user",req.query.user)
   console.log("symbol",req.query.symbol)
   //  res.status(200).send("mensaje");
   controller.findAvatar_block(req.body.avatar)
    response.success(req, res,"todo bien",201);

})



router.post('/', function (req, res)  {
  console.log(req.body)
  //  res.status(200).send("mensaje");
 controller.find_user(req.body).then((resultado)=>{
        console.log("resultado controller", resultado);
        response.success(req, res,resultado, 201);
    })

})

module.exports = router;