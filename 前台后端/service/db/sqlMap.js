var sqlMap = {
    blog:{
        selec: 'select * from blogs', 
        title: "select title from blogs where id_ in ",
        content: "select content from blogs where id_ in ",
        created: "select created from blogs where id_ in ",
        type: "select type from blogs where id_ in"
    },
    article:' insert into article (id_, blog) values (?,?);',
    articlemessage:'insert into blogs (id_,title,content,created,type) values (?,?,?,?,?);',
    //message中没有将blogs的主键设置为自增，还是要传入id
    articlelabel:'insert into tag (name,blog_id) values (?,?);',
    updated:{
        updatehtml:"update article set blog=? where id_=? ",
        updatemessage:"update blogs set title=?,content=?,updated=?,type=? where id_ = ?",
        deletetag:"delete from tag where blog_id = "
    },
    // xx:'insert into user (username, email, password) values (?,?,?)',
    id:'select Max(id_) from blogs;',
    searchArticle:'select blog from article where id_ = ',
    label:{
        labels:"select * from tags",
        artlabel:"select blog_id from tag where name = ",
        arcmessage: "select created,type,updated from blogs where id_ = ",
        arctags:"select name from tag where blog_id = ",
        lastnext:"select title from blogs where id_ = "
    },
    types: "select name from types;",
    backarticle:"select id_,created,title,type,content from blogs;",
    counttag:"select count(*) from tag where name = ",
    deletearticle:{
        message:"delete from blogs where id_ = ",
        html:"delete from article where id_ = ",
        tag:"delete from tag where blog_id = ",
        resetid:"select Max(id) from tag;",
        reset:"alter table tag auto_increment "
    },
    add:{
        addtype:'insert into types (name) values (?);',
        deletetype:'delete from types where name =',
        reset1:"alter table tags auto_increment ",
        addtag:'insert into tags (name) values (?)',
        deletetag:'delete from tags where name =',
        reset2:"alter table types auto_increment ",
    },
    wishes:{
        insert:'insert into wishes (wish) values (?);',
        get:'select wish from wishes where id = (select Max(id) from wishes);'
        },
    search:{
        title:"select title,content,id_ from blogs;",
       
    }
}

module.exports = sqlMap