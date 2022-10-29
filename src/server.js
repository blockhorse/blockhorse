require("dotenv").config();
const express= require('express');
const port = process.env.PORT || 4000
const bodyParser= require('body-parser')
const router= require('./network/routes')
let app=express()
app.use(bodyParser.json())
//app.use(router);
router(app);


let processor= require('./script/processor/')



if (process.env.NODE_ENV === "production"){
    app.use(express.static('build'));
    app.get('*',(req, res)=>{req.sendfile(path.resolve(__dirname, '../build/', 'index.html'))  })
}

app.listen(port, (err) => {
    if(err) return console.log(err);
    console.log(`Example app listening on port ${port}`);
})
 