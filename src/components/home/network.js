const express= require('express');
const router= express.Router()
router.use(express.static('build'));
 
console.log("ESTO ES EL HOME")


router.get('/', function (req, res)  {
     console.log("esto ES HOME/tete")
     req.sendfile(path.resolve(__dirname, './../build/', 'index.html'))  })







module.exports = router;