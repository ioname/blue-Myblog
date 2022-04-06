<template>
<div>
  <el-table
    :data="tableData"
    style="width: 100%"
    height="400">
    <el-table-column
      fixed
      prop="id"
      label="id"
      width="50">
    </el-table-column>
    <el-table-column
      fixed
      prop="created"
      label="创建日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="200">
    </el-table-column>
    <el-table-column
      prop="type"
      label="类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="content"
      label="简介"
      width="300">
    </el-table-column>
     <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small" >查看</el-button>
        <el-button type="text" size="small" @click="editarticle(scope.row)">编辑</el-button>
         <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, tableData)" >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>


export default {

  name: 'BlogList',
   data() {
      return {
        tableData: [
        //   {
        //   date: '2016-05-03',
        //   title: '王小虎',
        //   type: '上海',
        //   content: '普陀区',
        // }, 
        ],

      }
    },
  methods: {
      handleClick(row) {
        // console.log(row);
         this.$axios({
                method:'get',
                url:'http://localhost:5050/backhtml?id='+ row.id_
            }).then(res => {
                // console.log(res.data.data);
                let  taglist = [];
                let blogcontent = res.data.results[0][0].blog;
                for(var i in  res.data.results[1]){
                     taglist.push(res.data.results[1][i].name)
                }
                 this.$router.push({path:'/article',query:{data:row,html:blogcontent,tags:taglist}});
                // console.log(res.data.results[0][0].blog);
            })
       
      },
      getarticle(){
        this.$axios({
          method:'get',
          url:'http://localhost:5050/backarticle'
        }).then(res=>{
         
          let answer = res.data.results;
          for(var i in answer){
          answer[i].created = this.$moment(answer[i].created).format('YYYY-MM-DD HH:mm:ss');
          answer[i].id = i;
          answer[i].id++;
          this.tableData.push(answer[i])
          }
          this.tableData.reverse()
           console.log(this.tableData);
        })
        
      },
      editarticle(row){
        console.log(row.id_);
        this.$axios({
                method:'get',
                url:'http://localhost:5050/backhtml?id='+ row.id_
            }).then(res => {
                // console.log(res.data.data);
                let  taglist = [];
                let blogcontent = res.data.results[0][0].blog;
                for(var i in  res.data.results[1]){
                     taglist.push(res.data.results[1][i].name)
                }
                
                 this.$router.push({path:"/test",query:{data:row,html:blogcontent,tags:taglist}})
                // console.log(res.data.results[0][0].blog);
            })
        
      },
       deleteRow(index, rows) {
         this.$confirm('确认删除？','提示',{           
           cancelButtonText:'取消',
           confirmButtonText:'确定',
           type:'warning'
         }).then(()=>{
            let id = rows[index].id_;
            rows.splice(index, 1);
            this.$axios({
              method:'get',
              url:'http://localhost:5050/deletearticle?id=' + id
            })
            this.$message({
              type:'success',
              message:'删除成功'
            });
         }).catch(()=>{
           this.$message({
             type:'info',
             message:"已取消删除"
           })
         })
        
        
      }
    
    },
      created(){
        this.getarticle();
      }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
.el-table {
  position: absolute;
  top: 21vh;
  left: 20vw;
  width: 965px !important;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
