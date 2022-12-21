const express= require('express');
const router= express.Router()
const path = require('path');
reso=path.resolve(__dirname, './../build/', 'index.html')
console.log("reso", reso);

 



router.get('/', function (req, res)  {
     router.use(express.static('build'));
     req.sendfile(path.resolve(__dirname, './../build/', 'index.html'))  })







module.exports = router;





















