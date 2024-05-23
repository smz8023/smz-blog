import React,{useCallback, useEffect,useState} from 'react'
import {getBlogDetaile,getComment} from '../../../services/home';
import moment from 'moment'
import {Input,Button} from 'antd'
import axios from 'axios'
import {connect} from 'react-redux'
import "./index.less";
const Detaile = (props)=>{
const [data,setDate] = useState({})
const [content,SetContent] = useState('')
const [blog_id,SetBlogId] = useState('')
const [pagination,SetPagination] = useState({})
const [commentList,SetCommentList]= useState([])
const [user,setUser] = useState({})
  useEffect(()=>{
    const id = props.match.params.id;
    SetBlogId(id);
    getBlogDetaile(id).then(res=>{
    console.log(res)
    const obj = res.data.data;
        if(res.data.code===0){
          setDate(obj)
        }
    });
    getComment(id).then(res=>{
      console.log('res',res);
      const {data} = res.data;
      SetCommentList(data.result)
      SetPagination(data.pagination)
    })
    setUser(props.UserInfo.userinfo)
  },[props.UserInfo]);
  const changeVal = useCallback((e) =>{
    SetContent(e.target.value)
  },[content])
  const handel = useCallback(()=>{
    axios.post('/api/comment',{content,blogId:blog_id}).then(res=>{
      SetContent('')
    })
  },[content,blog_id])

  const setClassName = (i)=>{
    console.log('i',i);
    console.log('user',user);

    if(i.userId === user.id){
      return 'right'
    }else{
      return 'left'
    }
  }
  return <div className='blogDetaile'>
    <h1 className='blogDetaile-title'>{data.title}</h1>
    <div className='blogDetaile-img'>
      <div>
          <img src="https://upload.jianshu.io/users/upload_avatars/4933701/b502b336-e609-44d7-85cc-8c7db401b6ca.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp" alt=""/> 
      </div>
      <div className='blogDetaile-user'>
        <p><span>类型：{data.type}</span></p>
        <p><span>作者：{data.user?.nickName}</span> <span>创建时间：{moment(data.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span></p>
      </div>
       
    </div>
    <div>
      <div dangerouslySetInnerHTML={{__html:data.content}}></div>
      <div className='commentList'>
          {
            commentList.map((i,idx)=>{
              return <div key={idx} className={setClassName(i)}>
                <div>{i.content}</div>
                <div className='avatar'>{i.user.nickName || i.user.userName}</div>
              </div>
            })
          }
      </div>
      <div className='comment'>
        <div className='p'>评论：</div>
        <div className='i'><Input onChange={changeVal} /></div>
        <div className='s'><Button type="primary" onClick={handel}>提交</Button></div>
      </div>

    </div>
  </div>
}
export default connect(state=>({UserInfo:state.UserInfo}))(Detaile);