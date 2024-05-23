/**
 * 空的router跳转器:
 * 1.渲染routes的children(子路由);
 * 2.默认跳转到第一个子路由;
 */
import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import rdom from "react-dom";

let timerID = null;
export const ChildRoutesRender = props => {
  const { routes, defaultRoute } = props;

  // 增加逻辑判断
  if (!routes.length) {
    return null;
  }
  useEffect(() => {
    const dom = document.querySelector(".app");
    const ele = rdom.findDOMNode(dom);
    timerID = setTimeout(() => {
      if (localStorage.getItem("openId") === "1") {
        queryNode(ele);
      }
    }, 2000);
    return () => {
      clearInterval(timerID);
    };
  });
  const queryNode = node => {
    // console.log(node);
    const nodeList = node.childNodes;

    for (let i = 0; i < nodeList.length; i++) {
      var node = nodeList[i];

      if (node.nodeType == 1) {
        if (node.id === "") {
          const name = node.className;
          const parentNodeName = node.parentNode.id;
          node.setAttribute("id", `${parentNodeName}_${name}_${i}`);
        }
        queryNode(node);
      }
    }
  };
  const renderRoute = data => {
    return   data.map((route, index) => {
  
      const Com = route.component;
      if (route.children) {
        return renderRoute(route.children);
      } else {
        return (
          <Route
            path={route.path}
            render={RouteApi => {
              return <Com routes={route.children} {...RouteApi} />;
            }}
            key={route.path}
          />
        );
      }
    });
  
  };
  return (
    <Switch>
    {routes.map(route => (
      <Route
        path={route.path}
        render={routeApi => {
          const RouteComponent = route.component;
          return RouteComponent ? (
            <RouteComponent routes={route} {...routeApi} />
          ) : null;
        }}
        key={route.path}
      />
    ))}
    <Redirect to={defaultRoute || routes[0].path} />
  </Switch>
  );
};
