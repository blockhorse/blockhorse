const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');



router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend domain
  res.header('Access-Control-Allow-Methods', 'POST,GET'); // Adjust the allowed HTTP methods as needed
  next();
});

router.post('/', async (req, res) => {
 console.log("req, res", req.body);

  try {
    // Llamar al controlador para procesar el cofre
    const result = await controller.agregar_deposito(req.body);
    //console.log(req)
    // Enviar respuesta al cliente
    response.success(req, res, result, 201);
  } catch (error) {
    // Si ocurre un error, enviar respuesta de error al cliente
    response.error(req, res, error.message, 400);
  }
});




router.get('/', function (req, res)  {
        
 controller.buscar_apuestas(req.query).then((resultado)=>{
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

module.exports = router;
