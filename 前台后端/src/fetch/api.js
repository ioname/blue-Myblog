import axios from 'axios'


axios.defaults.timeout = 10000;

export default{ 
     fetchGet(url,paramObj){
    return new Promise((resolve,reject) => {
        let param = {params:paramObj}
        axios.get(url,param).then(response => {
            resolve(response.data);
        },err=>{
            reject(err);
        }).catch((error)=>{
            reject(error)
        })
    })
}
}

//获取所有文章
// allArticleGet(url){
    
//     return fetchGet(url,)
// }