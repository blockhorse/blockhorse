const express= require('express');
const router= express.Router()
const path = require('path');
reso=path.resolve(__dirname, './../build/', 'index.html')
console.log("reso", reso);

 



router.get('/', function (req, res)  {
   
try {
   router.use(express.static('build'));
   req.sendfile(path.resolve(__dirname, './../build/', 'index.html')) 
} catch (error) {
     console.log("EEEEEEEEEEEEEEEEEEe",error)
      console.log(error.TypeError)
     
     //con el if lo descubri tratando de hacer cambio de pagina desde el back   
     if(error =="TypeError: req.sendfile is not a function" ){
          console.log("Este es un error que activo, cuando se refresca pagina en dashboad")
           res.redirect("./");
     }
  if (error.response.status === 500) {
    // Internal server error occurred
    window.location.replace("/index.html");
  }
}



      })







module.exports = router;





















