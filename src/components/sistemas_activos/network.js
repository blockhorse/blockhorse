const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

// Middleware to handle CORS
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend domain
  res.header('Access-Control-Allow-Methods', 'GET'); // Adjust the allowed HTTP methods as needed
  next();
});

// Routes
router.get('/', controller.getSistemasActivos);

module.exports = router;
