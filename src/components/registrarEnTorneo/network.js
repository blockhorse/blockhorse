const express= require('express');
const response = require('../../network/response')
const controller =require("./controller")
const router= express.Router()

const cors = require('cors');
// Habilitar CORS para permitir solicitudes desde http://localhost:3000
router.use(cors({ origin: 'http://localhost:3000' }));
 



// Ruta GET
router.get('/', function (req, res) {
  controller.get_torneo(req.query).then((resultado) => {
    res.header('Content-Type', 'application/json');
    res.header('Cache-Control', 'no-cache');
    response.success(req, res, resultado, 201);
  });
});



router.post('/', function (req, res)  {
    res.header('Content-Type', 'application/json');
      res.header('Cache-Control', 'no-cache');
     res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
         // console.log("BODY",req.body)
    controller.registrarEnTorneo(req.body).then((resultado)=>{
        // console.log("resultado controller", resultado);
        response.success(req, res,resultado, 201);
    })
   

 

})
module.exports = router;