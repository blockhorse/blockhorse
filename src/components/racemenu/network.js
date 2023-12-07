// const express = require('express');
// const router = express.Router();
// const path = require('path');

// // Establece el directorio de recursos estáticos
// router.use(express.static(path.resolve(__dirname, './../build')));

// router.get('/', function (req, res) {
//   // Envía el archivo index.html
//   res.sendFile(path.resolve(__dirname, './../build', 'index.html'), function (err) {
//     if (err) {
//       console.log("Error:", err);
//       if (err.status === 404) {
//         // Manejar el error 404 (Not Found)
//         res.status(404).send('Página no encontrada');
//       } else {
//         // Manejar otros errores
//         res.status(500).send('Error interno del servidor');
//       }
//     }
//   });
// });

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const path = require('path');

// // Establece el directorio de recursos estáticos
// router.use(express.static(path.resolve(__dirname, './../../build')));

// // Manejar la ruta /races para servir el index.html
// router.get('/', function (req, res) {
//   // Envía el archivo index.html
//   res.sendFile(path.resolve(__dirname, './../../build', 'index.html'), function (err) {
//     if (err) {
//       console.log("Error:", err);
//       res.status(err.status).end();
//     }
//   });
// });

// module.exports = router;




const express = require('express');
const router = express.Router();
const path = require('path');

// Establece el directorio de recursos estáticos
router.use(express.static(path.resolve(__dirname, './../../../build')));

// Manejar la ruta /races para servir el index.html
router.get('/', function (req, res) {
  // Envía el archivo index.html
  res.sendFile(path.resolve(__dirname, './../../../build', 'index.html'), function (err) {
    if (err) {
      console.log("Error:", err);
      res.status(err.status).end();
    }
  });
});

module.exports = router;
