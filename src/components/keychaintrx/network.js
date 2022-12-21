const express= require('express');
const response = require('../../network/response')
const controller =require("./controller")
const router= express.Router()

//Este codigo Solo recibe las transacciones, pero no las procesa de por si.
 


router.post('/', function (req, res)  {
  
         console.log("BODY",req.body)

const {memo} = req.body.data;
const result = req.body.result;

if ((memo.startsWith("entering a") && (result !=null))) {
  console.log("The string starts with the specified phrase.");



 controller.set_inscripcion(req.body).then((resultado)=>{
        console.log("resultado controller", resultado);
        response.success(req, res,resultado, 201);
    })
   

}






})









module.exports = router;