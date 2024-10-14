// const express= require('express');
// const response = require('../../network/response')
// const controller =require("./controller")
// const router= express.Router()

 



// router.get('/', function (req, res)  {
        
// controller.get_equino(req.query).then((resultado)=>{
//  // console.log("resultado controller", resultado);  
// // res.headers.set('Content-Type', 'application/json')
// //          response.setHeader({
// //   'Content-Type': 'application/json',
// //   'Cache-Control': 'no-cache',
// //   'Access-Control-Allow-Origin': '*',
// // });
//          res.header('Content-Type', 'application/json');
// res.header('Cache-Control', 'no-cache');
// res.header('Access-Control-Allow-Origin', '*');
//         response.success(req, res,resultado, 201);
//     })
   


// })













// router.post('/', function (req, res)  {
// res.header('Content-Type', 'application/json');
// res.header('Cache-Control', 'no-cache');
// res.header('Access-Control-Allow-Origin', '*');
//          console.log("BODY Kerychain Res",req.body)

// const Newname = req.body.newname || null;
// console.log("Newname", Newname);
// if (Newname != null)  {
//   console.log("The string starts with the specified phrase.");



//  controller.registrar_cambio_de_nombre(req.body,Newname).then((resultado)=>{
//         console.log("resultado controller", resultado);
//         response.success(req, res,resultado, 201);
//     })
   

// }else{console.log("NO proceso post keychaintrx")}






// })




// module.exports = router;



const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

// Middleware to enable CORS
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

router.get('/', (req, res) => {
  controller.get_equino(req.query)
    .then((resultado) => {
      res.header('Content-Type', 'application/json');
      res.header('Cache-Control', 'no-cache');
      response.success(req, res, resultado, 201);
    })
    .catch((error) => {
      // Handle error
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});


// Nueva ruta para obtener 'otros_equinos'
router.get('/habilitar_equino', (req, res) => {
  console.log("req.query", req.query);
  controller.get_habilitar_equinos(req.query)
    .then((resultado) => {
      res.header('Content-Type', 'application/json');
      res.header('Cache-Control', 'no-cache');
      response.success(req, res, resultado, 201);
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

router.post('/', (req, res) => {
  res.header('Content-Type', 'application/json');
  res.header('Cache-Control', 'no-cache');
  console.log("BODY Kerychain Res", req.body);

  const Newname = req.body.newname || null;
    const Cuenta = req.body.account || null;
  console.log("Newname", Newname);

  if (Newname != null) {
    console.log("The string starts with the specified phrase.");
    controller.registrar_cambio_de_nombre(req.body, Newname)
      .then((resultado) => {
        console.log("resultado controller", resultado);
        response.success(req, res, resultado, 201);
      })
      .catch((error) => {
        // Handle error
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  } else {
    console.log("NO proceso post keychaintrx");
    if(Cuenta!= null){
        controller.get_equino_account(req.body).then((resultado) => {
      res.header('Content-Type', 'application/json');
      res.header('Cache-Control', 'no-cache');
      response.success(req, res, resultado, 201);
    })
    .catch((error) => {
      // Handle error
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
    }
  }
});

module.exports = router;
