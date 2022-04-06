<template>
    <div class="labellist">
        <div class="innerlabel">
            <div class="selection">
                <el-tabs type="border-card">
                    <el-tab-pane label="标签管理">
                        <div class="tags">
                               <el-tag
                        :key="tag"
                        v-for="tag in dynamicTags"
                        closable
                        :disable-transitions="false"
                        @close="handletagClose(tag)">
                        {{tag}}
                        </el-tag>
                        <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirmtag"
                        @blur="handleInputConfirmtag"
                        >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInputtag">+ New Tag</el-button>
                        </div>
         
                    </el-tab-pane>
                     <el-tab-pane label="类型管理">
                        <div class="tags">
                               <el-tag
                        :key="type"
                        v-for="type in dynamicTypes"
                        closable
                        :disable-transitions="false"
                        @close="handletypeClose(type)">
                        {{type}}
                        </el-tag>
                        <el-input
                        class="input-new-tag"
                        v-if="inputtypeVisible"
                        v-model="inputValue2"
                        ref="saveTypeInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirmtype"
                        @blur="handleInputConfirmtype"
                        >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInputtype">+ New Tag</el-button>
                        </div>
         
                    </el-tab-pane>
                    <el-tab-pane label="寄语编写">
                      <div class="tags">
                        <el-form ref="form" :model="form" label-width="80px">
                          <el-form-item label="我的寄语">
                            <el-input v-model="form.name"></el-input>
                          </el-form-item>
                          <el-form-item>
                            <el-button type="primary" @click="onSubmit">立即创建</el-button>
                            <el-button>取消</el-button>
                          </el-form-item>
                        </el-form>
                      </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>    
    </div>
</template>


<script>

  export default {
     data() {
      return {
        dynamicTags: [],
        dynamicTypes: [],
        inputVisible: false,
        inputtypeVisible: false,
        inputValue: '',
        inputValue2: '',
        form:{
          name:''
        }
      };
    },
    methods: {
      onSubmit() {
        let wish = this.form.name;
        let Obj = {};
        Obj['wish'] = wish
        console.log(wish);
        this.fetchGet('http://localhost:5050/postwish',Obj).then(res=>{
          console.log(res);
        })
        console.log('submit!');
      },
      handletagClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        let Obj = {};
        Obj['tag'] = tag; Obj['status'] = 1
        console.log(typeof(tag));
        if(tag!=" ")this.fetchGet('http://localhost:5050/adddeletetag',Obj).then(res=>{
            console.log(res);
        })
        
      },
      handletypeClose(type) {
        this.dynamicTypes.splice(this.dynamicTypes.indexOf(type), 1);
        let Obj = {};
        Obj['type'] = type; Obj['status'] = 1
        if(type!=" ") this.fetchGet('http://localhost:5050/adddeletetype',Obj).then(res=>{
            console.log(res);
        })
      },
      showInputtype() {
        this.inputtypeVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTypeInput.$refs.input.focus();
        });
        
      },
      showInputtag() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
         
      },
        fetchGet(url,paramObj){
            return new Promise((resolve,reject) => {
                this.$axios({
                    method:'post',
                    url:url,
                    data:paramObj
                }).then(response => {
                    resolve(response.data);
                },err=>{
                    reject(err);
                }).catch((error)=>{
                    reject(error)
                })
            })
        },

      handleInputConfirmtag() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        let Obj = {};
        Obj['tag'] = inputValue; Obj['status'] = 0;
         this.fetchGet('http://localhost:5050/adddeletetag',Obj).then(res=>{
            console.log(res);
          this.inputVisible = false;
          this.inputValue = '';
        })
      },
      handleInputConfirmtype() {
        let inputValue = this.inputValue2;
        if (inputValue) {
          this.dynamicTypes.push(inputValue);
        }
        let Obj = {};
        Obj['type'] = inputValue; Obj['status'] = 0;
         this.fetchGet('http://localhost:5050/adddeletetype',Obj).then(res=>{
            console.log(res);
        })
        this.inputtypeVisible = false;
        this.inputValue2 = '';
        
      },
      gettaglist(){
          this.$axios({
              method:'get',
              url:'http://localhost:5050/taglist'
          }).then(res=>{

              let answer = res.data.results;
              for(var i in answer)
              this.dynamicTags.push(answer[i].name)
          })
          this.$axios({
              method:'get',
              url:'http://localhost:5050/typelist'
          }).then(res=>{
              let answer = res.data.res;
              for(var i in answer)
              this.dynamicTypes.push(answer[i].name)
          })
      }
    },
    created(){
        this.gettaglist();
    }
  }
</script>

<style scoped>
    .labellist {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
    }
    .innerlabel {
        position: relative;
        border-radius: 10px;
        top: 20vh;
        width: 800px;
        height: 400px;
        background-color: #fff;
        padding: 20px;
    }
    .selection {
        margin: auto;
        position: absolute;
        left: 0;
        right: 0;
        width: 90%;
        height: 75%;
        border-radius: 10px;
        border: 1px solid #00adee;
        padding: 20px;
        /* background-color: black; */
    }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  el-tabs {
      height: 100% !important;
  }
  .tags {
      width: 100%;
      height: 220px;
      padding: 20px;
  }
 ::v-deep .el-input__inner {
    width: 90% !important;
  }
</style>