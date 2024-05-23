import React, { lazy } from "react";
import Heat from "@container/heat/index.js";
const Release = lazy(() => import('@container/release/index.js'));
import { ChildRoutesRender } from "@router/ChildRoutesRender";

export const routes = {
  path: "/heat",
  component: ChildRoutesRender,
  name:"热点",
  selectKey: "heat",
  children: [
    {
      path: "/heat/index",
      component: Heat,
      name: "热点",
      selectKey: "heat",
      hideInMenu: true
    },
  ]
};
