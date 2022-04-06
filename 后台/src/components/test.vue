<template>
      <div>
             <labelflow v-on:inline="labelinline" v-show="showlabel" v-on:unshowlabel="unshowlabellist"></labelflow>

        <div class="content">
            <div class="bgc"></div>
                <div class="contentcenter">
                    <div class="centerupper">                      
                        <div class="upperline">
                            <div class="inputline">
                                <div class="line">
                                    <div>标题</div>
                                    <input type="text" v-model="message.title" placeholder="标题字数在5-20个字以内">
                                </div>
                                  <div class="line">
                                    <div>简介</div>
                                    <input type="text" v-model="message.content" placeholder="简介字数在5-30个字以内">
                                </div> 
                                <div class="line">
                                    <div>类型</div>
                                    <select name="" id="" @change="getoption($event)" v-model="selected">
                                        <option value="1">请选择类型</option>
                                        <option v-for="(item,i) in typelist" :key="i"
                                         :value="item.name">{{item.name}}</option>
                                    </select>
                                </div>
                                 <div class="line">
                                    <div>标签</div>
                                    <section class="labelinlines"
                                    @click="showlabellist">
                                         <section class="labelinline"
                                        v-for="(item,i) in labellinelist"
                                        :key=i>
                                            {{item}}
                                        </section>
                                    </section>                                 
                                </div>
                                <div class="lastline">
                                    <!-- action是后端地址， on-exceed超出文件数量方法-->
                                    <!-- multiple是多选文件支持，on-preview绑定点击已上传文件的方法 -->
                                   <el-upload
                                    class="upload-demo"
                                    ref="upload"
                                    action="111"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :file-list="fileList"
                                    :http-request="submitUpload"
                                    :on-success="handlesuccess"
                                    :on-error="handlerror"
                                    :auto-upload="false">
                                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                   <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                    </el-upload>
                               </div>
                            </div>                        
                           <div class="articleline">
                               <mavon-editor v-model="value"></mavon-editor>
                           </div>
                           <div class="downline">
                               <button class="button" @click="getcontext">发送</button>
                           </div>
                        </div>
                    
                    </div>
                     
                </div>
            </div>
          
    </div>
</template>

<script>
// import CKEditor from "@ckeditor/ckeditor5-build-decoupled-document"
import labelflow from './labelflow.vue'
import 'mavon-editor/dist/markdown/github-markdown.min.css'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import CKEditor from '@ckeditor/ckeditor5-build-decoupled-document'
//   5 种编辑器都是官方打包好的，功能范围已经限定好,必须自己定义才能添加额外功能
//  import '@ckeditor/ckeditor5-code-block/src/codeblock';
export default {
    name:'Te-st',
    components:{
        labelflow,
    },
    data(){
        return {
            headers:{'Content-Type': 'multipart/form-data'},
            value: null,
            showlabel:false,
            selected:1,
            title:'',
            content:'',
            created:'',
            type:'',
            message:{
                title: this.title,
                content: this.content,
                created: this.created,
                type: this.type,
                updated:0
            },
            typelist:[],
            labellinelist:[],
            change:0,
            changeid:0,
            fileList: []
            // title:title,
            //     content:content,
            //     created:created,
            //     type:type
        }
    },
    mounted(){
        this.gettypelist();
        
    },
    methods:{
        getcontext(){     
            var results = this.value;
            console.log(results);
            let message = this.message;
            let list = this.labellinelist;
            if(!this.message.title || !this.message.content || !this.message.type){
                alert('信息不完整');
                return;
            }
            if(this.changeid == 0){ 
                let adata = new Date();
            let dataformat = adata.getFullYear()+"-"+(adata.getMonth() + 1)+"-"+adata.getDate()+" "+adata.getHours()+":"+adata.getMinutes()+":"+adata.getSeconds();
             this.message.created = dataformat;
             this.message.updated = dataformat;
            }else{
                let adata = new Date();
            let dataformat = adata.getFullYear()+"-"+(adata.getMonth() + 1)+"-"+adata.getDate()+" "+adata.getHours()+":"+adata.getMinutes()+":"+adata.getSeconds();
             this.message.updated = dataformat;
            }
           
            
            //  this.message = {
            //      title: this.title,
            //     content: this.content,
            //     created: this.created,
            //     type: this.type
            // }
            this.$axios({
                method:'post',
                url:'http://localhost:5050/backend',
                data:{
                    Editor: results,
                    Message: message,
                    labels: list,
                    change: this.change,
                    id:this.changeid
                }
                
            }).then(res=>{
                alert(res.data.msg);
             
                
                console.log(res);
               
            })
        },
        gettypelist(){
            this.$axios({
                method:'get',
                url:'http://localhost:5050/typelist'
            }).then(res=>{
                // console.log(res.data.res);
                for(let i in res.data.res)
                this.typelist.push(res.data.res[i])
                // console.log(this.typelist);
                 if(this.$route.query.data)this.setmessage();
            })
        },
        showlabellist(){
            this.showlabel = true
        },
        unshowlabellist(e){
            this.showlabel = e;
        },
        labelinline(e){
            console.log(e);
            this.labellinelist = [];
            for(var i in e){
                this.labellinelist.push(e[i].name)
            }
            console.log(this.labellinelist);
        },
        getoption(event){
            this.message.type = event.target.value;
        },
        setmessage(){
            this.change = 1;
            this.changeid = this.$route.query.data.id_;
            this.message = this.$route.query.data;
            this.selected = this.$route.query.data.type;
            this.value = this.$route.query.html;
            this.labellinelist = this.$route.query.tags;
            // console.log(this.$route.query.data);
        },
      handleRemove(file, fileList) {
        console.log(file);
      },
      handlePreview(file) {
        console.log(file);
      },
      submitUpload(){
         let file = this.$refs.upload.uploadFiles;
           let formData = new window.FormData();
            //  formData.append("11","xx");
            console.log(file);
           file.forEach((i,index)=>{
                // formData.append('name',this.message.title);
                formData.append('photo',i.raw);  
                //直接输出formData是空，需要get   
                console.log(formData.get(i.name));
           })

        this.$axios({
            method:'post',
            url:'http://localhost:5050/upload',
            headers:{ 'Content-Type': 'application/x-www-form-urlencoded' },
            data:formData,   //data只能接收一个参数formdata
             transformRequest: [function(){
                return formData;
            }],
            params:this.message.title
        }).then(res=>{
            console.log(res);
        })
      },
      handlesuccess(res,file,fileList){
          console.log("ok");
      },handlerror(res,file,fileList){
          console.log("shibai");
      }
    },
    created(){
     
    }
}
</script>
 <style scoped>
              * {
            padding: 0;
            margin: 0;
        }
        .content {
            display: flex;
            width: 100%;
            justify-content: center;
            height: 100%;
            min-height: 261px;
            
        }
        .bgc {
             background-color: #1ca0d3;
             width: 100%;
             height: 30vh;
             position: absolute;
        }
        .contentcenter {
            display: flex;
           
            flex-direction: column;
            width: 85%;
            height: 100%;
            max-width: 1125px;
        }
        .centerupper {
            position: absolute;
            left: 20vw;
            top:21vh;
            width: 70vw;
            display: flex;
            flex-direction: row;
            overflow: hidden;
        }
        .uppername {
            height: 45vh;
            font-size: 15px;
            display: flex;
            
            justify-content: center;
        }
        .upperline {
            
           
            width: 95%;
           
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: #fff;
            box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 7px 10px 0 rgba(0,0,0,0.12);
        }
        .innerline {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
       
        .catalog{
            position: relative;
            top: 10vh;
            width: 15%;
            margin-right: 5%;
            padding: 20px;
            text-align: center;
            display: fixed;
        }
        .cataname {
            font-size: 2rem;
            font-weight: bold;
            width: 100%;
            text-align: center;
        }
        .cataline {
            width: 100%;
        }
        .cataline li {
            font-size: 1rem;
        }
        .articleline {
            position: relative;
            z-index: 1;
            height: auto;
            width: 100%;
            border-bottom: 1px solid #1ca0d3;
        }
        .inputline {
            height: 300px;
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }
        .line {
            width: 40%;
            height: 30px;
            margin: 10px;
            padding: 5px;
            display: flex;
            flex-direction: row;

        }
        .line input {
            width: 100%;
            height: 30px;
        }
        .line div {
            width: 50px;
            font-size: 1rem;
            text-align: center;
            line-height: 30px;
            padding: 0 10px;
            background-color: #0d681e;
            color: #fff;
        }
      
        .buttonup {
            right: 5px;
            bottom: 5px;
            position: absolute;
            display: flex;
            flex-direction: column;
        }
        .button {
             width: 100px;
             height: 56px;
             border-radius: 10px;
             background-color: #1da7da;
             box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 7px 10px 0 rgba(0,0,0,0.12);
             cursor: pointer;
             text-align: center;
             line-height: 56px;
             display: inline-block;
            margin-top: 5px;
            color:#Fff;
           
         }
        .labelinlines {
            cursor: pointer;
            width: 100%;
            height: 30px;
            border: 1px solid #aeaeb9;
            display: flex;
            flex-direction: row;
            justify-content: left;
        }
        .labelinline {
            min-width: 50px;
            height: 20px;
            background-color: #8cc33d;
            text-align: center;
            border-radius: 5px;
            margin-top: 5px;
            margin-left: 5px;
            padding: 0 5px;
        }
        .lastline {
            height: 50px;
            width: 200px;
        }
         .downline {
            height: 100px;
            width: 100%;
            display: flex;
            justify-content: center;
        }
 
    </style>