import './index.less'
import React from 'react'
import {Input, Button,Tag,Upload,Icon} from 'antd'
// import marked from 'marked';
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import * as MarkdownIt from 'markdown-it';
import * as ReactMarkdown from 'react-markdown';
import {postRelease} from "@services/release"
import axios from 'axios';
import hljs from "highlight.js";
import 'highlight.js/styles/github.css';
const PLUGINS = ['header', 'image', 'full-screen'];
export default class Release extends React.Component {
  constructor(props){
    super();
    this.state = {

      type:null,
    }
    this.mdParser = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight(code) {
   
        if (code) {
          try {
            console.log('JInahsdkjhaKJSHD&&&&&&&&&&&&&&&&&')
            // return hljs.highlight(lang, str).value
           return  hljs.highlightAuto(code).value;
          } catch (__) {}
        }
        return '' // use external default escaping
     
      },
    });
    this.typeArray=[
      {type:1,color:"magenta",value:'React'},
      {type:2,color:"red",value:'webpack'},
      {type:3,color:"volcano",value:'koa2'},
      {type:4,color:"orange",value:'mysql'},
      {type:5,color:"blue",value:'canvas'},
      {type:6,color:"lime",value:'其他'},
    ]
  }
 

  componentDidMount () {
    this.isLivinig = true;

    
  }

  componentWillUnmount () {
    this.isLivinig = false
  }

  handleEditorChange = (it) => {
    // console.log('handleEditorChange', it.html);
    this.setState({
      value: it.text,
    });
  };

  handleImageUpload = (file) => {
    console.log("file",file)
    return new Promise(resolve => {
      const reader = new FileReader();
        var fd = new FormData();
        fd.append('file',file);
      
        // 如果还想传一些参数，可以继续使用fd.append("filename", "自定义文件名");
        axios({
          method: 'POST',
          url: '/api/upload',
          data: fd,
      
        }).then(resp => {
            console.log(resp.data);
      resolve(resp.data.result.url)

        }).catch(err => console.log(err));

      reader.readAsDataURL(file);
    });
  };

  onCustomImageUpload = (event) => {
    console.log('onCustomImageUpload', event);
    // return new Promise((resolve, reject) => {
    //   // const result = window.prompt('Please enter image url here...') as string;
    //   resolve({ url: 'www.test.com' });
    //   // custom confirm message pseudo code
    //   // YourCustomDialog.open(() => {
    //   //   setTimeout(() => {
    //   //     // setTimeout 模拟oss异步上传图片
    //   //     // 当oss异步上传获取图片地址后，执行calback回调（参数为imageUrl字符串），即可将图片地址写入markdown
    //   //     const url = 'https://avatars0.githubusercontent.com/u/21263805?s=80&v=4'
    //   //     resolve({url: url, name: 'pic'})
    //   //   }, 1000)
    //   // })
    // });
  };



  handleSetValue = () => {
    const text = window.prompt('Content');
    this.setState({
      value: text,
    });
  };

  renderHTML=(text)=> {
    return this.mdParser.render(text);
    // Using react-markdown
    // return React.createElement(ReactMarkdown, {
    //   source: text,
    // });
  }
// 选择标签
selectTag = (item)=>{

  const {type} = this.state;

  this.setState({
    type:item.type===type?null:item.type
  })
}
// title
changeTitle =(e)=>{
  this.setState({
    title:e.target.value
  })
}
// 提交
submit=()=>{
  const body = {
    title:this.state.title,
    content:this.mdEditor.getHtmlValue(),
    htmlContent:this.mdEditor.getMdValue(),
    type:this.state.type
  }
  // console.log('body',body)
  var reg = /(<[^>]+>)|([\`])/ig;

  console.log("value",this.mdEditor.getMdValue().replace(reg,''))
  // console.log('******************************************************************')
  // console.log('html',this.mdEditor.getHtmlValue())
  postRelease(body)
}


  render () {

  

    const { type,title } = this.state

    return (
      <>
        <div className="release">
          <div className='release-titleWrap'>
            标题：<Input value={title} className='release-title' onChange={(e)=>this.changeTitle(e)} /> 
            <Button type='primary' onClick={()=>this.submit()} className='release-submit'>提交</Button>
          </div>
          <div className='release-type'>
            <div>类型：</div>
              {
                this.typeArray.map(item=>{
                return <div
                onClick={()=>this.selectTag(item)} 
                className='release-Tag' 
                key={item.type} 
                ><Tag color={item.color} className={type===item.type?'release-TagItem':null}>{item.value}</Tag></div>
                })
              }
          </div>
       
          <div className='BraftEditor'> 
          <MdEditor
            ref={node => (this.mdEditor = node || undefined)}
            value={this.state.value}
            style={{ height: '500px', width: '100%' }}
            renderHTML={this.renderHTML}
            // plugins={PLUGINS}
            config={{
              view: {
                menu: true,
                md: true,
                html: true,
                fullScreen: true,
                hideMenu: true,
              },
              table: {
                maxRow: 5,
                maxCol: 6,
              },
              // imageUrl: 'https://octodex.github.com/images/minion.png',
              // syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
            }}
            onChange={this.handleEditorChange}
            onImageUpload={this.handleImageUpload}
            // onFocus={e => console.log('focus', e)}
            // onBlur={e => console.log('blur', e)}
            // onCustomImageUpload={this.onCustomImageUpload}
     
          />
          </div>
        </div>
      </>
    )

  }

}