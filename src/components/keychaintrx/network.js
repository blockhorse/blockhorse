const express= require('express');
const response = require('../../network/response')
const controller =require("./controller")
const router= express.Router()

//Este codigo Solo recibe las transacciones, pero no las procesa de por si.
 


router.post('/', function (req, res)  {
res.header('Content-Type', 'application/json');
res.header('Cache-Control', 'no-cache');
res.header('Access-Control-Allow-Origin', '*');
         console.log("BODY Kerychain Res",req.body)

const {memo} = req.body.data;
const result = req.body.result;

if ((memo.startsWith("EQ- entering") && (result !=null))) {
  console.log("The string starts with the specified phrase.");



 controller.set_inscripcion(req.body).then((resultado)=>{
        console.log("resultado controller", resultado);
        response.success(req, res,resultado, 201);
    })
   

}else{console.log("NO proceso post keychaintrx")}






})









module.exports = router;