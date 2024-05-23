import React, { Component } from "react";
import { Icon, Button, Card } from "antd";
import ZUpload from "../../components/ZUpload.js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { z_event } from "@utils/event.js";
import * as actions from "@redux/actions/comparison.js";
import * as message from "../../components/Message";
import {getBlogList} from '../../services/home'
import BlogItem from './component/BlogItem';
import "./Index.less";
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
      data: {
        arr: []
      },
      result:[],
      count:0

    };
  }

  componentDidMount() {

    getBlogList().then(res=>{
      console.log('res',res)
      const {data} = res.data;
      if(res.data.code === 0){
          this.setState({
            result:data.result,
            count:data.count
          })
      }
    })

  }
  render() {
    const { data,result } = this.state;

    return <div className='home'>
      {
        result.map(i=>{
          return <BlogItem history={this.props.history} key={i.id} item={i} />
        })
      }
    <div>
    </div>

    </div>;
  }
}
export default Index;
