const multer = require("multer");
const fs = require("fs");
const express = require('express')
const models = require('../db/db');
const router3 = express.Router();
const mysql = require('mysql');



const conn = mysql.createConnection(models.mysql);
//图片传入后进行操作
const storage = multer.diskStorage({
  destination(req,file,cb){
    cb(null,'img/png/')
  },
  filename(req,file,cb){
    // const filenamearr = file.originalname.split('.');
    cb(null,file.originalname);
  }
})

const upload1 = multer({storage})
//此处dest是第一级文件夹，如果没有会自己创建，存入后是一个未知文件，加上文件后缀如 .png 就行

//multer接收前端传入的formdata
//前后端的键名要相同，此处photo对应前端photo
router3.post("/upload",upload1.single('photo'),(req,res)=>{
  console.log(req.file.originalname);
    conn.query('update blogs set imgurl = ? where title = ' + "'" + req.query[0]+"'",[req.file.originalname],(error,res)=>{
      if(error)console.log(error);
    })
      res.send('111')
})

router3.get('/imgurl',(req,res)=>{
  let title = req.query.title;
  console.log(title);
  conn.query('select imgurl from blogs where title = '+ "'" + title+"';",(error,results)=>{
    if(error)console.log(error);
    console.log(results);
    res.send({
      data:results
    })
  })

})

module.exports = router3
  
