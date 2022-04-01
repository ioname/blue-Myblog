const express = require('express');
const cors = require('cors');
const app = express();
const indexapi = require('./api/indexapi');
const backend = require('./api/backend')
const uploadapi = require('./api/upload')
const path = require('path')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use(cors());
app.all('*', function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Headers','Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",'3.2.1');
    res.header("Content-Type","application/json;charset=utf-8");
    next();
});



//静态文件资源托管
app.use(express.static('img'))

app.use(indexapi);
app.use(backend);
app.use(uploadapi);


app.listen(5050);
console.log("success");
