const models = require('../db/db');
const express = require('express');

const router2 = express.Router();
const mysql = require('mysql');
const $sql = require('../db/sqlMap');


const conn = mysql.createConnection(models.mysql);
conn.connect();

router2.post('/backend',(req,res)=>{
    let html = req.body.Editor;
    let message = req.body.Message;
    let labels = req.body.labels;
    let msg = '';
    if(message.title.length > 20 || message.title.length < 5 || message.content.length > 30 || message.content < 5){
        res.json({
            code:301,
            msg:'输入标题或简介不满足要求'
        })
    }else{
        if(req.body.change == 1){
            let id = req.body.id;
            conn.query($sql.updated.updatemessage+';'+$sql.updated.updatehtml+';',[message.title,message.content,message.updated,message.type,id,html,id],(error,results)=>{
                if(error)return error;
                else{
                    conn.query($sql.updated.deletetag+id,(error,results)=>{
                        if(error)console.log(error);
                        conn.query($sql.deletearticle.resetid,(error,results)=>{
                            if(error)return error;

                            let id_ = results[0]['Max(id)'];
                            if(id_ == null)id_ = 1;
                            conn.query($sql.deletearticle.reset+id_+';',(error,results)=>{
                                if(error)console.log(error);
                            })
                            for(var i = 0; i < labels.length; i++){
                                conn.query($sql.articlelabel,[labels[i],id],(error,results)=>{
                                    if(error) console.log(error);
                                    msg = '更新成功'
                                })
                            }
                        })
                    })
                    
                }                
            })
        }else{
        conn.query($sql.id,(error,results)=>{
            if(error) throw error;
            let id = Number(Object.values(results[0])) + 1;
            conn.query($sql.article,[id,html],(error,rus)=>{
                if(error) console.log(error);
                console.log(rus);
            })
            conn.query($sql.articlemessage,[id,message.title,message.content,message.created,message.type],(error,rus)=>{
                if(error) console.log(error);
                console.log(rus);
            })
           
            for(var i = 0; i < labels.length; i++){
                conn.query($sql.articlelabel,[labels[i],id],(error,results)=>{
                    if(error) console.log(error);
                    console.log(results);
                })
            }
        })
        // let html = req.body.Editor;
        // let message  = req.body.Message;
       msg="发送成功"
    }
    res.json({
        code:200,
        msg:msg
    });
}
    // console.log(req.body.Message);
    // console.log(req.body.labels);
    // let message = req.body.Message;
   
})

router2.get('/typelist',(req,res)=>{
    conn.query($sql.types,(error,results)=>{
        if(error) return error;
        else 
        res.send({
            res:results
        })
    })
})

router2.get('/taglist',(req,res)=>{
    conn.query($sql.label.labels,(error,results)=>{
        if(error) return error;
        else 
        res.send({
           results
        })
    })
})

router2.get('/backarticle',(req,res)=>{
    conn.query($sql.backarticle,(error,results)=>{
        if(error) return error;
        res.send({
            results
        })
    })
})

router2.post('/adddeletetype',(req,res)=>{
    let params = req.body;
    console.log(params.status);
    if(params.status == 0){
    conn.query($sql.add.addtype,[params.type],(error,results)=>{
        if(error) return error;
        res.send({
            results
        })
    })}
    else {
    conn.query($sql.add.deletetype +'"'+params.type + '";'+'delete from types where name = " ";',(error,results)=>{
        
        if(error) console.log( error);
        console.log(3);
        let temp = results;
        conn.query("select Max(id) from tags",(error,results)=>{
            if(error)console.log(error);
            let id = results[0]['Max(id)'];
            conn.query($sql.add.reset2+id+';',(error,resuts)=>{
                if(error)console.log(error);
                console.log(1);
                res.send({
                    temp
                })
              
            })

        })
       
    })
}
})

router2.post('/adddeletetag',(req,res)=>{
    let param = req.body;
    if(param.status == 0)
    conn.query($sql.add.addtag,[param.tag],(error,results)=>{
        if(error) return error;
        res.send({
            results
        })
    })
    else 
    conn.query($sql.add.deletetag + '"' + param.tag + '";' + 'delete from tags where name = " ";',(error,results)=>{
        if(error) return error;
        let temp = results;
        conn.query("select Max(id) from tags",(error,results)=>{
            if(error)console.log(error);
            let id = results[0]['Max(id)'];
            conn.query($sql.add.reset1+id+';',(error,resuts)=>{
                if(error)console.log(error);
                console.log(1);
                res.send({
                    temp
                })
              
            })

        })
    })
})

router2.get('/backhtml',(req,res)=>{
    let id = req.query.id;
    conn.query($sql.searchArticle+id+ ';' + $sql.label.arctags + id + ';',(error,results)=>{
        if(error) return error;
        console.log(2);
        res.send({
            results
        })
    })
})

router2.get('/deletearticle',(req,res)=>{
    let id = req.query.id;
    conn.query($sql.deletearticle.message + id + ';' + $sql.deletearticle.html + id + ';' + $sql.deletearticle.tag + id + ';',(error,results)=>{
        if(error)console.log(error);
    })
    conn.query($sql.deletearticle.resetid,(error,results)=>{
            if(error)return error;
            console.log(results);
            let id_ = results[0]['Max(id)'];
            if(id_ == null)id_ = 1;
            console.log(id_);
            conn.query($sql.deletearticle.reset+id_+';',(error,results)=>{
                if(error)console.log(error);
            })
        })
    res.send({
        code:200
    })
})

router2.post('/postwish',(req,res)=>{
    let wish = req.body.wish;
    console.log(req.body);
    conn.query($sql.wishes.insert,[wish],(error,results)=>{
        if(error)console.log(error);
       
        res.send({
            msg:'成功'
        })
       
    })
})
module.exports =  router2;

