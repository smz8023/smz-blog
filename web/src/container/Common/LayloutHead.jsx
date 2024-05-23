/* eslint-disable prefer-const */
/* eslint-disable no-const-assign */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/*
 * @Author: lxc
 * @Date: 2019-06-19 15:46:59
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-09-21 15:30:45
 */

import React, { Component,Suspense } from "react";
import { Link } from "react-router-dom";
import { Avatar, Menu, Spin } from "antd";
import { deleteCookie } from "@utils/cookie";
import { connect } from "react-redux";
import logo from "@assets/Img/logo.png";
import Left from './Left'
import { SvgIcon } from "../../components/SvgIcon";
import { z_event } from "@utils/event.js";
import BA from '../../assets/Img/beian.png'
import "./index.less";

const { SubMenu } = Menu;
const getIcon = icon => {
  if (typeof icon === "string") {
    if (isUrl(icon)) {
      return (
        <Icon
          component={() => (
            <img src={icon} alt="icon" className={styles.icon} />
          )}
        />
      );
    }
    if (icon.startsWith("icon-")) {
      return <IconFont type={icon} />;
    }
    return <Icon type={icon} />;
  }
  return icon;
};
class LayloutHead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "mail",
      spinning: true,

      routesConfig: this.props.routes
    };
    z_event.on("lodingclose", this.close);
    z_event.on("lodingopen", this.open);
  }
  componentDidMount() {
    this.close(false, 1200);
  }
  close = (bl, time) => {
    setTimeout(() => {
      this.setState({
        spinning: false
      });
    }, time || 0);
  };
  open = () => {
    this.setState({
      spinning: true
    });
  };
  conversionPath = path => {
    if (path && path.indexOf("http") === 0) {
      return path;
    }
    return `/${path || ""}`.replace(/\/+/g, "/");
  };
  getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => this.getSubMenuOrItem(item))
      .filter(item => item);
  };
  getSubMenuOrItem = (item, index) => {
    // doc: add hideChildrenInMenu
    if (
      item.children &&
      !item.hideChildrenInMenu &&
      item.children.some(child => child.name)
    ) {
      const { name } = item;
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{name}</span>
              </span>
            ) : (
            <Link
            to={item.path}
          >
            <span>{name}</span>
          </Link>
            )
          }
          key={`${item.selectKey}_${index}`}
          popupClassName={"z_menu"}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={item.selectKey}>{this.getMenuItemPath(item)}</Menu.Item>
    );
  };
  getMenuItemPath = item => {
    const { name } = item;
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    const { location, isMobile, onCollapse } = this.props;
    return (
      <Link
        to={itemPath}
        target={target}
        // replace={itemPath === location.pathname}
        onClick={
          isMobile
            ? () => {
                onCollapse(true);
              }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };
  render() {

    const z_selectedKeys = () => {
      // let path = this.props.routesConfig.location.pathname;
      // return path.split("/");
    };
    return (
      <>
        <div
          style={{
            position: "absolute",
            top: "130px",
            width: "40px",
            marginLeft: "-20px",
            left: "50%"
          }}
        >
          <Spin size="large" spinning={this.state.spinning} />
        </div>
        <div className="layLoat-head">
          <div className="layLoat-left">
            <span
              className="layLoat-leftChild"
              id="LayloutHead-leftChild-id"
              onClick={() => {
                this.props.history.replace("/blog");
              }}
            >
              博
              <img className="logo" src={logo} alt="" />客
            </span>
          </div>
      
          <div className="layLoat-center">
            <Menu
              key="Menu"
              subMenuCloseDelay={0.5}
              mode={"horizontal"}
              theme={"dark"}
              selectedKeys={z_selectedKeys()}
            >
              {this.getNavMenuItems(this.state.routesConfig)}
            </Menu>
          </div>
          <div className="layLoat-right"></div>
        </div>
       <div className='app-wrap'>
          <div className='app-left'>
          <Left />  
          </div>
          <div className='chiildren-component'>
          <Suspense fallback={<div>Loading...</div>}>
            {this.props.children}
          </Suspense>
          </div>
      
       </div> 
       <div className='footer-w'>
         <div  className='footer'>
            <a target="_blank" 
                href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802031975" 
                style={{display:'inline-block',textDecoration:'none',height:'20px',lineHeight:'20px'}}>
            <img src={BA}  style={{float:"left"}}/>
              <p style={{
                float:'left',
                height:'20px',
                lineHeight:'20px',
                margin: '0px 0px 0px 5px',
                color:'#fff'}}>京公网安备 11010802031975号{ `    `}&nbsp; &nbsp;&nbsp;&nbsp;京ICP备20019785号</p></a>
            </div>
        </div>
      </>
    );
  }
}

export default LayloutHead;
