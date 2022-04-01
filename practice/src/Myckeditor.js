// 第一步：引入 CKEditor5
import CKEditor from "../node_modules/ckeditor5/packages/ckeditor5-build-classic";



// 第二步：自定义工具栏内容
CKEditor.defaultConfig = {
  language: "zh-cn",
  
  toolbar: [
      "heading",
    "bold",
    "italic",
    "strikethrough",
    "underline",
    "|",
    "fontFamily",
    "fontSize",
    "fontColor",
    "fontBackgroundColor",
    "|",
    "numberedList",
    "bulletedList",
    "alignment",
    "codeblock",
    "|",
    
    "blockQuote",
    "link",
    "imageUpload",
    "|",
    "undo",
    "redo",
  ],
  // 配置可用的字体大小
  fontSize: {
    options: [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38],
  },
  // 配置图片功能栏
  image: {
    toolbar: [
      "imageTextAlternative",
      "imageStyle:full",
      "imageStyle:side",
      "imageStyle:alignLeft",
      "imageStyle:alignCenter",
      "imageStyle:alignRight",
    ],
    styles: ["full", "side", "alignLeft", "alignCenter", "alignRight"],
    // plugins:[CodeBlock],
    codeBlock:{
      languages:[
        { language: 'plaintext', label: 'Plain text', class: '' },

        { language: 'php', label: 'PHP', class: 'php-code' },

        { language: 'javascript', label: 'JavaScript', class: 'js javascript js-code' },

        { language: 'python', label: 'Python' },

        { language: 'css', label: 'css', class:'language-css'},

        { language: 'c++', label: 'c++', class:'language-c++'},

        { language: 'css', label: 'css', class:'language-css'},

        { language: 'html', label: 'html', class:'language-html'},

        { language: 'java', label: 'java', class:'language-java'},
      ]
    }
  },
}

// 第三步：声明上传图片的构造函数
// class UploadAdapter {
//   constructor(loader) {
//     this.loader = loader;
//   }

//   upload() {
//     return new Promise(resolve => {
//       let file = this.loader.file;
//       let url = URL.createObjectURL(file)
      
//       resolve({
//         default: url,
//       });
//     });
//   }
// }
// 第四步：导出 CKEditor 和 UploadAdapter
export default  CKEditor 
