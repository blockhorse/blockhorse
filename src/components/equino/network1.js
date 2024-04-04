const express = require('express');
const response = require('../../network/response');
const controller = require("./controller");
const router = express.Router();

// Middleware para configurar encabezados CORS
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Ruta GET
router.get('/', function (req, res) {
  controller.get_equino(req.query).then((resultado) => {
    res.header('Content-Type', 'application/json');
    res.header('Cache-Control', 'no-cache');
    response.success(req, res, resultado, 201);
  });
});

// Ruta POST
router.post('/', function (req, res) {
  res.header('Content-Type', 'application/json');
  res.header('Cache-Control', 'no-cache');
  console.log("BODY Kerychain Res", req.body);
  const Newname = req.body.newname || null;
  console.log("Newname", Newname);
  if (Newname != null) {
    console.log("The string starts with the specified phrase.");
    controller.registrar_cambio_de_nombre(req.body, Newname).then((resultado) => {
      console.log("resultado controller", resultado);
      response.success(req, res, resultado, 201);
    });
  } else {
console.log("NO proceso post keychaintrx");

if(req.body.account){
  console.log("req.body.account", req.body.account);
  
}

  }
});

module.exports = router;
