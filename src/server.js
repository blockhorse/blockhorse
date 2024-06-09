// require("dotenv").config();
// const express= require('express');
// const path = require('path');
// fs= require('fs')
// https = require('https')
// const port = process.env.PORT || 4000
// const ssl_port=process.env.PORTSSL || 443
// const bodyParser= require('body-parser')
// const router= require('./network/routes')
// let app=express()
// app.use(bodyParser.json())

// //app.use(router);
// router(app);


// let processor= require('./script/processor/')

// key=require('path').resolve(__dirname, '../certificate/key-one.pem');
// cert=require('path').resolve(__dirname, '../certificate/cert.pem');


// if (process.env.NODE_ENV === "production"){
//     app.use(express.static('build'));
//     app.get('/',(req, res)=>{  
//          console.log("REQUESON PRINCIPAL")
//         req.sendfile(path.resolve(__dirname, './../build/', 'index.html'))  })


// }



// app.listen(port, (err) => {
//     if(err) return console.log(err);
//     console.log(`Example app listening on port ${port}`);
// })






require("dotenv").config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./network/routes');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
router(app);

// Ruta para servir archivos estáticos en modo de producción
if (process.env.NODE_ENV === "production") {
  app.use(express.static('build'));

  // Manejar todas las demás rutas y enviar al archivo index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});




}




app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Example app listening on port ${port}`);
});






// require("dotenv").config();
// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// const router = require('./network/routes');

// const app = express();
// const port = process.env.PORT || 4000;

// app.use(bodyParser.json());
// router(app);

// // Ruta para servir archivos estáticos en modo de producción
// if (process.env.NODE_ENV === "production") {
//   // Ajustar la ruta para que apunte al directorio build en el nivel superior
//   app.use(express.static(path.resolve(__dirname, '..', 'build')));

//   // Manejar todas las demás rutas y enviar al archivo index.html
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'), (err) => {
//       if (err) {
//         res.status(500).send(err);
//       }
//     });
//   });
// }

// app.listen(port, (err) => {
//   if (err) {
//     return console.log(err);
//   }
//   console.log(`Example app listening on port ${port}`);
// });
