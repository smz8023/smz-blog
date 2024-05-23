import React from "react";
import Login from "@container/Login";
import Outh from "@container/Outh";

export const routes =[
  {
    path: "/login",
    component: Login,
    name: "登录"
  },
  {
    path: "/oauth/redirect",
    component: Outh,
    name: "github登录"
  }
];
