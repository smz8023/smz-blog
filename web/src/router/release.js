import React, { lazy } from "react";
import Heat from "@container/heat/index.js";
const Release = lazy(() => import('@container/release/index.js'));
import { ChildRoutesRender } from "@router/ChildRoutesRender";

export const routes = {
  path: "/release",
  component: ChildRoutesRender,
  name:"发布",
  selectKey: "release",
  children: [
    {
      path: "/Release/index",
      component: Release,
      name: "发布",
      selectKey: "release",
      hideInMenu: true
    },
  ]
};
