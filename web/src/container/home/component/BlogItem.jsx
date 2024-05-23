import React,{useCallback} from 'react';
import './index.less'
import 'highlight.js/styles/github.css';
var reg = /(<[^>]+>)|([\`|\#])/ig;
const BlogItem = ({item,...props})=>{
  const {htmlContent} = item;
const jump = useCallback(()=>{
  props.history.push(`/blog/detaile/${item.id}`)
},[]);
return <div className='blogitem' onClick={jump}>
    <h1>{item.title}</h1>
    <div className='content'>
      {htmlContent&&htmlContent.replace(reg,'')}
    </div>
  </div>
}
export default BlogItem;