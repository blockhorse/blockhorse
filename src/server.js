require("dotenv").config();
const express= require('express');
const path = require('path');
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


//base=path.basename("./../build/")
//console.log("base", base);

//reso=path.resolve(__dirname, './../build/', 'index.html')
//console.log("reso", reso);
//app.use(express.static(path.join(__dirname,'./../build/'))) 
// app.use("*", express.static('build'));

//  app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './../build', 'index.html'));
// });

//console.log("PPPPPPPPPPPPPPPPPPPPPPPAAAAAAAAAAAAAAAATH",path)
if (process.env.NODE_ENV === "production"){
    app.use(express.static('build'));
    app.get('/',(req, res)=>{  
         console.log("REQUESON PRINCIPAL")
        req.sendfile(path.resolve(__dirname, './../build/', 'index.html'))  })


}

   // app.use("/", express.static('build'));
    // app.get('/',(req, res)=>{  
    //      console.log("REQUEAST",req)
    //     req.sendfile(path.resolve(__dirname, './../build/', 'index.html'))  })
    // //app.get('/dashboard',(req, res)=>{req.sendfile(path.resolve(__dirname, './../build/', 'index.html'))  })
   


app.listen(port, (err) => {
    if(err) return console.log(err);
    console.log(`Example app listening on port ${port}`);
})






