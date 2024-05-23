/*
 * @Author: lxc
 * @Date: 2019-05-15 11:52:33
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-09-18 15:57:22
 */

import React from "react";
// eslint-disable-next-line import/first
import { getCookie } from "@utils/cookie";
// eslint-disable-next-line import/first
import { withRouter } from "react-router-dom";
/* eslint-disable camelcase */
/* eslint camelcase: "error" */
import { z_event } from "@utils/event";
import Routes from "./routes";
import RouteMap from "./map";

@withRouter
class RouterView extends React.PureComponent {
  constructor() {
    super();
  }

  render() {
    const { routes } = this.props;
    return <RouteMap routes={routes === undefined ? Routes : routes} />;
  }
}
export default RouterView;
