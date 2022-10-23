const express= require('express');
const response = require('../../network/response')
const controller =require("./controller")
const router= express.Router()



router.get('/', function (req, res)  {
   //  res.status(200).send("mensaje");
   controller.findAvatar_block(req.body.avatar)
    response.success(req, res,"todo bien",201);

})



router.post('/', function (req, res)  {
  //  res.status(200).send("mensaje");
    response.success(req, res,"todo bien",201);

})

module.exports = router;