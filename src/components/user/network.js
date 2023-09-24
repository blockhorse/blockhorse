// const express= require('express');
// const response = require('../../network/response')
// const controller =require("./controller")
// const router= express.Router()



// router.get('/', function (req, res)  {
//    var query = require('url').parse(req.url,true).query;
//    console.log("user",req.query.user)
//    console.log("symbol",req.query.symbol)
//    //  res.status(200).send("mensaje");
//    controller.findAvatar_block(req.body.avatar)
//     response.success(req, res,"todo bien",201);

// })



// router.post('/', function (req, res)  {
//   console.log(req.body)
//   //  res.status(200).send("mensaje");
//  controller.find_user(req.body).then((resultado)=>{
//         console.log("resultado controller", resultado);
//         response.success(req, res,resultado, 201);
//     })

// })

// module.exports = router;




const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const cors = require('cors'); // Agrega la importación de cors

const router = express.Router();


const allowedOrigins = ['https://ballos.herokuapp.com/', 'http://localhost:4000']; // Agrega todos los dominios permitidos aquí

// Configurar middleware CORS para el enrutador
const corsOptions = {
  origin: allowedOrigins,
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
};

router.use(cors(corsOptions));

// Define tus rutas aquí
router.get('/', function (req, res) {
  var query = require('url').parse(req.url, true).query;
  console.log('user', req.query.user);
  console.log('symbol', req.query.symbol);
  controller.findAvatar_block(req.body.avatar);
  response.success(req, res, 'todo bien', 201);
});

router.post('/', function (req, res) {
  console.log(req.body);
  controller.find_user(req.body).then((resultado) => {
    console.log('resultado controller', resultado);
    response.success(req, res, resultado, 201);
  });
});

module.exports = router;
