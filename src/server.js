require("dotenv").config();
const express= require('express');
fs= require('fs')
https = require('https')
const port = process.env.PORT || 4000
const ssl_port=process.env.PORTSSL || 443
const bodyParser= require('body-parser')
const router= require('./network/routes')
let app=express()
app.use(bodyParser.json())

//app.use(router);
router(app);


let processor= require('./script/processor/')

key=require('path').resolve(__dirname, '../certificate/key-one.pem');
cert=require('path').resolve(__dirname, '../certificate/cert.pem');

//console.log('Path of file in parent dir:', require('path').resolve(__dirname, '../certificate/key-one.pem'));




if (process.env.NODE_ENV === "production"){
    app.use(express.static('build'));
    app.get('*',(req, res)=>{req.sendfile(path.resolve(__dirname, './../build/', 'index.html'))  })
}

app.listen(port, (err) => {
    if(err) return console.log(err);
    console.log(`Example app listening on port ${port}`);
})


// https.createServer(
//         // Provide the private and public key to the server by reading each
//         // file's content with the readFileSync() method.
//     {
//       key: fs.readFileSync(key), 
//       cert: fs.readFileSync(cert),
//     },
//     app
//   ).listen(ssl_port, (err) => {    
//     if(err) return console.log(err);
//     console.log(`Example app listening on port ${ssl_port}`);
// });
 




