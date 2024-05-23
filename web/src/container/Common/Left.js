import React,{PureComponent} from 'react';
import logo from '@assets/Img/logo.png'
import './left.less'
import {Icon} from 'antd'
import {connect} from 'react-redux'
import { bindActionCreators } from "redux";
import * as actions from "@redux/actions/userinfo.js";
import {getUserInfo} from '../../services/user'
@connect(
  state => ({UserInfo:state.UserInfo}),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)
 class Left extends PureComponent {
    constructor(props) {
      super(props);
        this.state={
          user:{
            avatar_url:'',
         
          }
        }
    }
    componentDidMount(){
      getUserInfo().then(res=>{
        if(res.data.code===0){
          this.props.actions.setUserInfo(res.data.data)
          this.setState({
            user:res.data.data
          })
        }
      })
    }
  //跳转
  jump=(type,user)=>{
    if(type === 'github'){
      window.open(user?.html_url, '_blank')
    }else{
     
      window.open(' https://blog.csdn.net/smz8023', '_blank')
    }
  }
  render(){
    const {user} = this.state;
    console.log('user',user);
    return <div className='left-wrap'>
        <div className='left-logo'>
          <img src={user.avatar_url} />
          <div className='left-name'> 
            <p> {user?.name||user?.login} </p>
          </div>
          <p>
            前端打杂人员，略微代码洁癖
          </p>
          <p className='left-git-csdn'>
            <span className='cursor' onClick={()=>{this.jump('github',user)}}><Icon type="github" />github</span>
            <span className='cursor' onClick={()=>{this.jump('csdn')}}><Icon type="html5" />CSDN</span>
          </p>
        </div>
        <div></div>
        <div></div>
    </div>
  }
};
export default Left;