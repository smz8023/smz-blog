/*
 * @Author: lxc
 * @Date: 2019-05-15 11:52:33
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-09-18 15:57:22
 */

import React from "react";
import { ClientId } from "@utils/github";
import { Outh } from "@services/outh";
import querystring from "querystring";
import "./index.less";
class Index extends React.PureComponent {
  constructor() {
    super();
  }
  componentDidMount() {
    let code = querystring.parse(this.props.location.search);

    Outh({ client_id: code["?code"] })
      .then(res => {
        console.log('登陆成功',res);
        this.props.history.push("/blog");
      })
      .catch(err => {
        this.props.history.push("/login");
      });
  }
  render() {
    return (
      <div className="login">
        <div className="spinner">
          <div className="dot1"></div>
          <div className="dot2"></div>
        </div>
      </div>
    );
  }
}
export default Index;
