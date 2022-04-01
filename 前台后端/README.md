# my-blog

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

数据表设计规范
1.在没有innodb无法满足的功能的情况下，所有表必须使用该存储引擎，其高并发下性能更好
2.字符集统一使用UTF8MB4，兼容性更好
3.所有字段都要有注释   使用comment从句
4.谨慎使用分区表，跨区查询效率可能更低
5.减少表的宽度，每个表最多存储4096行
6.禁止存放图片，文件等大二进制数据，io操作很耗时，通常只存储文件地址，文件存在专门的文件服务器里
7.尽可能把所有列定义为not null
8.推荐用专门的datetime（8字节）或timestamp（4字节）存储日期，用字符串存储1是无法进行计算与比较，二是空间占得多
9.金额相关的用decimal类型，不会丢失精度


DROP TABLE IF EXISTS `blogs`;
CREATE TABLE `blogs` (
  `id_` int NOT NULL,
  `title` varchar(100) NOT NULL COMMENT '标题',
  `type` varchar(50) DEFAULT NULL COMMENT '类型',
  `created` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `updated` timestamp NULL DEFAULT NULL COMMENT '更新时间',
  `content` text NOT NULL COMMENT '内容',
  `userid` varchar(50) DEFAULT NULL COMMENT '编写人',
  `commentsnum` int(11) DEFAULT '0' COMMENT '回复数',
  `readcount` int(11) DEFAULT '0' COMMENT '阅读数',
  PRIMARY KEY (`id_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='文章表';

insert into blogs (title,type,created,updated,content) values (?,?,?,?,?);

alter table blogs add column imgurl varchar(30) null comment '图片地址';

CREATE TABLE `article` (
  `id_` int  NOT NULL,
  `blog` longtext NOT NULL COMMENT '博客',
  PRIMARY KEY (`id_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='博客html';

DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`(
  `id` INT PRIMARY KEY AUTO_INCREMENT comment '标签id',
  `name` VARCHAR(20) NOT NULL comment '标签名称',
  `blog_id` INT NOT NULL comment '文章id'
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='标签表';

CREATE TABLE `tags`(
  `id` INT PRIMARY KEY AUTO_INCREMENT comment '标签id',
  `name` VARCHAR(20) NOT NULL comment '标签名称'
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='标签';


CREATE TABLE `types`(
  `id` INT PRIMARY KEY AUTO_INCREMENT comment 'id',
  `name` VARCHAR(20) NOT NULL comment '类型名称'
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='类型表';

CREATE TABLE `wishes`(
  `id` INT PRIMARY KEY AUTO_INCREMENT comment 'id',
  `wish` VARCHAR(20) NOT NULL comment '寄语'
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='我的寄语表';

INSERT INTO BLOGS (id_,title,type,created,updated,content,userid,commentsnum,readcount)
VALUES
("2","使用 http-server 开启一个本地服务器","后端知识","2022-03-13 00:00:01","2022-03-13 00:00:01","当检索由不同时区中的客户端插入TIMESTAMP值时，将获得存储数据库中不同的值。 只要不更改时区，就可以获得与存储的相同的TIMESTAMP值。","1","2","2");

INSERT INTO tag (id,name,blog_id)
VALUES
("1","nodejs","1");

insert into article (id_,article) values ("1","<p>123456</p>");

insert into tags (name) values ("后端");

insert into types (name) values ("前端技术");
//个人令牌
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

