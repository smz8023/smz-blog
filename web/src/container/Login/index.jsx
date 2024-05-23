/* eslint-disable no-plusplus */
/* eslint-disable prefer-rest-params */
/* eslint-disable func-names */
import React, { Component } from "react";
import { addCookie, getCookie, deleteCookie } from "@utils/cookie";
import { connect } from "react-redux";
import { Form, Button,Checkbox  } from "antd";
import md5 from "md5";
import Base64 from "base-64";
import { bindActionCreators } from "redux";
import TestForwardRef from '../../components/TestForwardRef'
import * as actions from "@redux/actions/comparison.js";
import loginGithub from "@assets/Img/login-github.png";
import { ClientId } from "@utils/github";
import {throttle,debounce} from '../../utils/debounce'
import BA from '../../assets/Img/beian.png'
import "./index.less";

import TreeNode from './TreeNode'
@TestForwardRef
class Test extends Component {
  constructor(props) {
    super(props);
    this.state={
      test:'我是子组件的返回值'
    }
  }

  add = debounce((t)=>{
    console.log('t',t)//t 123123123

      return this.state
  })
  render() {
    return (
      <div>
        <Button onClick={()=>{
          this.add('123123123')
        }}>我要测试一下</Button>
      </div>
    );
  }
}

@connect(state=>state.alarm,  dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))
class Login extends Component {
  
  constructor() {
    super()
    this.state = {
      isNoLogin: false,
      checkedKeys:[]
    };
      this.ref = React.createRef();
  }
  componentDidMount(){
    console.log(this.props)
  }
  //login github 登录
  login = () => {
    // console.log('this.ref',this.ref.current.add())
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${ClientId}`;
  };
  // test=()=>{
  //   this.props.actions.test('我在测试一下')
  // }
  // 选中的key
  selectKeys=(type,item,ParentKey)=>{
 
    if (type) {
      
      this.setState({
        checkedKeys:[...this.state.checkedKeys,item]
      },()=>{
        console.log(item)
        console.log(this.state.checkedKeys)
      })

    }else{
      this.setState({
        checkedKeys:this.state.checkedKeys.filter(i=>i!==item&&i!==ParentKey)
      })
    }
  }
  render() {
  

    const treeData = [
      {
        title: '0-0',
        key: '0-0',
        children: [
          {
            title: '0-0-0',
            key: '0-0-0',
            children: [
              { title: '0-0-0-0', key: '0-0-0-0' },
              { title: '0-0-0-1', key: '0-0-0-1' },
              { title: '0-0-0-2', key: '0-0-0-2' },
            ],
          },
          {
            title: '0-0-1',
            key: '0-0-1',
            children: [
              { title: '0-0-1-0', key: '0-0-1-0' },
              { title: '0-0-1-1', key: '0-0-1-1' },
              { title: '0-0-1-2', key: '0-0-1-2' },
            ],
          },
          {
            title: '0-0-2',
            key: '0-0-2',
          },
        ],
      },
      {
        title: '0-1',
        key: '0-1',
        children: [
          { title: '0-1-0-0', key: '0-1-0-0' },
          { title: '0-1-0-1', key: '0-1-0-1' },
          { title: '0-1-0-2', key: '0-1-0-2' },
        ],
      },
      {
        title: '0-2',
        key: '0-2',
      },
    ];
    return (
      <React.Fragment>
        <div className="login">
          <div className="login-center">
            <div className="login-title">
              <p className="login-title-p">GitHub 账号登录</p>
              <img
                onClick={() => {
                  this.login();
                }}
                className="cursor"
                src={loginGithub}
              />
              {/* <Button onClick={()=>{this.test()}}>测试</Button>   */}
              {/* <h1>{this.props.test}</h1> */}
           
            
               {/* <TreeNode  data={treeData} /> */}
               {/* <Test ref={this.ref}></Test>  */}
              
            </div>
          </div>
        </div>
        <div style={{ padding:'20px 0px',position:'absolute',bottom:"0px",color:"#fff",marginLeft:"41%"}}>
                    <a target="_blank" 
                    href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802031975" 
                    style={{display:'inline-block',textDecoration:'none',height:'20px',lineHeight:'20px'}}>
                    <img src={BA} 
                    style={{float:"left"}}/>
                    <p style={{float:'left',height:'20px',lineHeight:'20px',margin: '0px 0px 0px 5px',color:'#fff'}}>京公网安备 11010802031975号{ `    `}&nbsp; &nbsp;&nbsp;&nbsp;京ICP备20019785号</p></a>
                  </div>
      </React.Fragment>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Login);
export default WrappedNormalLoginForm;
