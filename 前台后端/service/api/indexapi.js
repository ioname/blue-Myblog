const models = require('../db/db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../db/sqlMap');

const conn = mysql.createConnection(models.mysql);
conn.connect();

function getlist(answer,id,res){
    // var ans;
     conn.query(id,(error,results) => {
        if(error)
        throw error;
        let commend;
        let idString;
        let id = [];
            for(key in results){   
                results[key] = results[key].id_;  //这里写id_不报错
                id.push( results[key])
                if(!idString)
                idString = results[key];
                else
                idString = idString + "," + results[key];
            }           
                const title = $sql.blog.title + '(' + idString + ');';
                const type =  $sql.blog.type + '(' + idString + ');';
                const content =  $sql.blog.content + '(' + idString + ');';
                const created =  $sql.blog.created + '(' + idString + ');';
               
                 commend =  title+type+content+created;  
                 var arr = Object.keys(results);
                let ids = arr.length;
             new Promise((resolve)=>{
                conn.query(commend,(error,results) => {
                    if(error)
                       throw error;
                      
                        answer = {
                            title: results[0],
                            type: results[1],
                            content: results[2],
                            created: results[3],
                            id: id
                        };
                       //这里写 res.send(answer); 会出现两次res。send，估计是外层还有一个自动的res.send
                       //上面错误，是服务器响应后没有return ； 避免多余响应    
                    //   console.log(answer);
                       resolve(answer);
                    //    console.log(idarrays);      
                });
        }).then(function(answer){
                 res.send({
                    answer
                });;
            })
    //         var arr = Object.keys(results);
    //    if(key == arr.length) return ;  
            // const ids = results.length;
            //对象不具有foreach方法
               //先根据page取出对应id，在遍历输出这些id对应 limit （page-1）*9,9
    })
}

router.get('/index',(req,res)=>{
    let num = req.query;
    let num1 = num[Object.keys(num)[0]];
    // console.log(num1);
    const id = "select id_ from blogs order by created desc limit " + (num1-1)*12 + ",12;";  //查询到一个带RowDataPacket的数组
    let ans;
    //ans发给前端信息，id请求数据库id语句，res回应
     getlist(ans,id,res);
    
//    res.send('关于'); 不能有多个res.send
})

router.get('/article',(req,res)=>{
    let num = req.query.id;
    //此处num是文章id号
    // console.log($sql.searchArticle+num);
    // console.log($sql.searchArticle + num + ';'+$sql.label.arcmessage + num + ';');
    conn.query($sql.searchArticle + num + ';'+$sql.label.arcmessage + num + ';' + $sql.label.arctags + num + ';',(error,results)=>{
        if(error) {
            console.log(error);
            res.send({
                msg:'出错'
            })
        }else
        // conn.query()
    res.send({
        code:200,
        data:results
    })

    })
})
router.get('/lastnext',(req,res)=>{
    let id = req.query.id;
    id=Number(id);
    let lastid = id-1
    let nextid = id+1
    conn.query($sql.label.lastnext + lastid + ';' + $sql.label.lastnext + nextid + ';',(error,results)=>{
        if(error)console.log(error);
        res.send({
            results
        })
    })
})

router.get('/labels',(req,res)=>{
    // console.log($sql.searchArticle+num);
    let num;
    let num2 = [];
    conn.query($sql.label.labels,(error,results)=>{
        if(error) {
            console.log(error);
            res.send({
                msg:'出错'
            })
        }else{
            num = results;
                for(var i in num){
                    conn.query($sql.counttag + "'" + results[i].name + "';",(error,results)=>{
                    if(error)console.log(error);
                    else {
                        num2.push(results[0]["count(*)"])
                        if(i == num.length-1){
                            count = true;
                        }
                    }
                    if(num2.length == num.length)
                    res.send({
                        data:num,
                        number:num2
                     })
                })   
                

                }
        
            
        
        }
    

    })
   
})

router.get('/labellist',(req,res)=>{
    // console.log($sql.searchArticle+num);
    // console.log(1);
    let name1 = req.query.name;
    let ans;
    // let name2 = name1[Object.keys(name1)[0]]
    conn.query($sql.label.artlabel+name1,(error,results)=>{
        // console.log($sql.label.artlabel+name1);
        if(error)console.log(error);
        // console.log(results);
        let idstring = '';
        for(var i in results){
            // console.log(results[i].blog_id);
            idstring = idstring + results[i].blog_id;
            if(i != results.length-1) idstring += ','
        }
        const id = 'select id_ from blogs where id_ in ('+idstring + ')'
        // console.log(id);
        if(idstring == '')
        res.send('1')
        else
        getlist(ans,id,res);
        
        // const id = "select id_ from blogs order by created desc limit " + (num1-1)*12 + ",12;";
    })
    // console.log(name1);
   
    

        // getlist(ans,,res);
        // console.log(1);
        // console.log($sql.label.artlabel+name1);
       

    
})
router.get('/getwish',(req,res)=>{
    conn.query($sql.wishes.get + "select count(*) as allpage from blogs",(error,results)=>{
        if(error)console.log(error);
        res.send({
            results
        })
    })
})

router.get('/listlabel',(req,res)=>{
    let id = Number(req.query.id);
    let end = Number(req.query.end);
    let cmd = '';


    for(var i = id; i <= end; i++){
        cmd = cmd+'select name from tag where blog_id =' + i + ';' 
    }
    conn.query(cmd,(error,results)=>{
        if(error)console.log(error);
          res.send({
                   results
                })
    })

})

router.get('/search',(req,res)=>{
    conn.query($sql.search.title,(error,results)=>{
        if(error)console.log(error);
        res.send({
            results
        })
    })
})
module.exports = router;