const express= require('express');
const router= express.Router()
router.use(express.static('build'));
 



router.get('/', function (req, res)  {
     req.sendfile(path.resolve(__dirname, './../build/', 'index.html'))  })







module.exports = router;





















