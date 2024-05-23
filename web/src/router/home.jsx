import React, { lazy } from "react";
import Home from "@container/home/index.js";
import Detaile from '@container/home/component/Detaile.js'
import { ChildRoutesRender } from "@router/ChildRoutesRender";
export const routes = {
  path: "/blog",
  component: ChildRoutesRender,
  name:"我的博客",
  // defaultRoute: "/",
  selectKey: "web",
  children: [
    {
      path: "/blog/index",
      component: Home,
      hideInMenu: true,
      selectKey: "my",
      name: "我的博客",
    },
    {
      path: "/blog/detaile/:id",
      component: Detaile,
      hideInMenu: true,
      selectKey: "one",
      name: "博客详情"
    },
  ]
};
