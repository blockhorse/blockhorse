const express= require('express');
const response = require('../../network/response')
const controller =require("./controller")
const router= express.Router()

 



router.get('/', function (req, res)  {
        console.log("req boletos: ", req.query);
        
controller.get_boletos(req.query).then((resultado)=>{
        console.log("result controller boletos", resultado);

res.header('Content-Type', 'application/json');
res.header('Cache-Control', 'no-cache');
res.header('Access-Control-Allow-Origin', '*');
        response.success(req, res,resultado, 201);
    })
   


})






module.exports = router;