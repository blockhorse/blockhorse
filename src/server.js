// require("dotenv").config();
// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// const router = require('./network/routes');

// const app = express();
// const port = process.env.PORT || 4000;

// app.use(bodyParser.json());
// router(app);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.resolve(__dirname, '../build')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../build', 'index.html'), (err) => {
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




require("dotenv").config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete de CORS
const router = require('./network/routes');

const app = express();
const port = process.env.PORT || 4000;

// Habilita CORS para todas las solicitudes
app.use(cors());

// Middleware de análisis de cuerpo de la solicitud
app.use(bodyParser.json());

// Configuración de rutas
router(app);

// Configuración para producción
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, '../build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'), (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
}

// Iniciar el servidor
app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Servidor escuchando en el puerto ${port}`);
});
