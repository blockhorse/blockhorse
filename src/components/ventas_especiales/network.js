const express= require('express');
const response = require('../../network/response')
const controller =require("./controller")
const router= express.Router()

 



router.get('/', function (req, res)  {
        console.log("req, res", req, res);
        
controller.get_ventas_packs(req.query).then((resultado)=>{
        console.log("resultado controller", resultado);
        // res.headers.set('Content-Type', 'application/json')
//          response.setHeader({
//   'Content-Type': 'application/json',
//   'Cache-Control': 'no-cache',
//   'Access-Control-Allow-Origin': '*',
// });
         res.header('Content-Type', 'application/json');
res.header('Cache-Control', 'no-cache');
res.header('Access-Control-Allow-Origin', '*');
        response.success(req, res,resultado, 201);
    })
   
// response.setHeader('Content-Type', 'application/json');
 
// Content-Type: application/json


})


module.exports = router;