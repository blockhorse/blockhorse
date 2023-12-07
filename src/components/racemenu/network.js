const express = require('express');
const router = express.Router();
const path = require('path');

// Establece el directorio de recursos estáticos
router.use(express.static(path.resolve(__dirname, './../build')));

router.get('/', function (req, res) {
  try {
    // Envía el archivo index.html
    res.sendFile(path.resolve(__dirname, './../build', 'index.html'));
  } catch (error) {
    console.log("Error:", error);
    if (error.response && error.response.status === 500) {
      // Si hay un error interno del servidor, redirecciona a un lugar deseado
      res.redirect("/index.html");
    } else {
      // Maneja otros errores aquí
      res.status(404).send('Not Found');
    }
  }
});

module.exports = router;

