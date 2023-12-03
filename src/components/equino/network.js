const express= require('express');
const response = require('../../network/response')
const controller =require("./controller")
const router= express.Router()

 



router.get('/', function (req, res)  {
        
controller.get_equino(req.query).then((resultado)=>{
 // console.log("resultado controller", resultado);  
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



// router.post('/', function (req, res)  {
//      res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

//          //console.log("BODY",req.body)
//     controller.get_race(req.body).then((resultado)=>{
//         //console.log("resultado controller", resultado);
//         response.success(req, res,resultado, 201);
//     })
   

 

// })


// Ruta POST para manejar la solicitud
router.post('/', async function (req, res) {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend domain
      res.header('Access-Control-Allow-Methods', 'POST'); // Adjust the allowed HTTP methods as needed
 
  try {
    // Ejecutar la lógica en tu controlador para obtener la carrera (utilizando la función get_race)
    const resultado = await controller.post_equino(req.body);
    
    // Enviar la respuesta exitosa con el resultado
    res.status(201).json(resultado);
  } catch (error) {
    // Manejar errores si ocurrieron
    console.error('Error:', error);
    res.status(500).json({ error: 'Hubo un error al procesar la solicitud.' });
  }
});






module.exports = router;