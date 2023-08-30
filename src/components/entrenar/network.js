const express= require('express');
const response = require('../../network/response')
const controller =require("./controller")
const router= express.Router()

 


router.post('/', function (req, res)  {
   //  res.header("Access-Control-Allow-Origin", "*");
 // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
         //console.log("BODY",req)
         
         if(req.query.equineId){

            //console.log("BODY",req.query)
             controller.entrenar(req.query).then((resultado)=>{
              //   console.log("resultado controller", resultado);
                 response.success(req, res,resultado, 201);
             })
            
         }

         if (req.body.data && req.body.data.memo) {

            //console.log("BODYBODYDOOOOOOODODDOODODODODODODODDDODODODODYDYDYDYDYDYDYDYDDYDYYDYD")

               //console.log("BODY",req.query)
               controller.entrenar_pago(req.body).then((resultado)=>{
                 //console.log("resultado controller", resultado);
                 response.success(req, res,resultado, 201);
             })
         }
 

})






module.exports = router;