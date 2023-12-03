const express= require('express');
const response = require('../../network/response')
const controller =require("./controller")
const router= express.Router()

const cors = require('cors');
// Habilitar CORS para permitir solicitudes desde http://localhost:3000
router.use(cors({ origin: 'http://localhost:3000' }));
 

router.get('/', function (req, res) {
  if (req.query.latest || req.query.page) {
    // Llamada a la función get_races para obtener las últimas carreras o paginar
    controller.get_races(req.query).then((resultado) => {
      console.log("resultado controller", resultado);

      res.header('Content-Type', 'application/json');
      res.header('Cache-Control', 'no-cache');
      res.header('Access-Control-Allow-Origin', '*');
      response.success(req, res, resultado, 201);
    });
  } else {
    // Llamada a la función get_race para obtener todas las carreras
    controller.get_race(req.query).then((resultado) => {
      console.log("resultado controller", resultado);

      res.header('Content-Type', 'application/json');
      res.header('Cache-Control', 'no-cache');
      res.header('Access-Control-Allow-Origin', '*');
      response.success(req, res, resultado, 201);
    });
  }
});



router.post('/', function (req, res)  {
    res.header('Content-Type', 'application/json');
      res.header('Cache-Control', 'no-cache');
     res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
         console.log("BODY",req.body)
    controller.get_race(req.body).then((resultado)=>{
        // console.log("resultado controller", resultado);
        response.success(req, res,resultado, 201);
    })
   

 

})
module.exports = router;