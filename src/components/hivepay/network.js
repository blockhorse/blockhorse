const express= require('express');
const response = require('../../network/response')
const controller =require("./controller")
const router= express.Router()



router.get('/', function (req, res)  {
   //  res.status(200).send("mensaje");
   console.log("BODY",req.body)
   controller.findAvatar_block(req.body.avatar)
    response.success(req, res,"todo bien",201);

})



router.post('/', function (req, res)  {
  //  res.status(200).send("mensaje");
  console.log("BODY",req.body)
    response.success(req, res,"todo bien",201);

})

module.exports = router;