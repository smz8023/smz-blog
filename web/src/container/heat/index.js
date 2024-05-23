import React, { Component,createRef } from "react";
import { Icon, Button,Card } from "antd";
import ZUpload from "../../components/ZUpload.js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { z_event } from "@utils/event.js";
import * as actions from "@redux/actions/comparison.js";
import * as message from "../../components/Message";
import {gitList} from '../../services/user'
import "./index.less";
@connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollHeight: 0,
      data:{
        articleFeed:{
          items:{
            edges: [], 
          pageInfo:{
            endCursor: "",
            hasNextPage: true
          }
        },
      }
    }
  }
    this.scrollHeight = createRef(null)
  }

  componentDidMount() {
    const headHeight = document.querySelector('.layLoat-head').clientHeight;
    this.setState({
      scrollHeight: window.innerHeight - headHeight
    })
    this.fetchData('')
  }
  // 加载数据
fetchData=(after)=>{
  gitList(after).then(res=>{
    if(res.data.code === 0 ){

      this.setState({
        data:{
          articleFeed:{
            items:{
              edges:[...this.state.data.articleFeed.items.edges,...res.data.data.data.articleFeed.items.edges],
              pageInfo:res.data.data.data.articleFeed.items.pageInfo
            }
          }
         
        }
      })
    }
  })
}
// 滑动
handleScroll=()=>{
  const hasMore = this.state.data.articleFeed.items.pageInfo.hasNextPage;

  if(hasMore){

    if(this.scrollHeight.current.scrollTop + this.scrollHeight.current.clientHeight >= this.scrollHeight.current.scrollHeight){
      let after =this.state.data.articleFeed.items.pageInfo.endCursor;
      this.fetchData(after)
    }
  }
}
  render() {
    const {data,scrollHeight} = this.state;
    console.log(data.articleFeed.items.edges)
    return <div className='heat'
        ref={this.scrollHeight}
        onScroll={this.handleScroll.bind(this)}
     >
      {data.articleFeed.items.edges.map(i=>{
        return <Card className='z-card' key={i.node.id}>
        <p className='heat-title-user'><span className='heat-heat'>热门</span> · {i.node.user.username}</p>
        <p className='heat-title'>
        {i.node.title}
      </p>
        </Card>
      })}
    </div>;
  }
}
export default Index;
