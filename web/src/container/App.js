/* eslint-disable react/jsx-filename-extension */
import React, { Component} from "react";
import RouterView from "@router/index";
import  store,{persistor} from "@redux/index";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";

import zhCN from "antd/es/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

import {PersistGate} from 'redux-persist/lib/integration/react';
moment.locale("zh-cn");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
 
  }

  render() {
    return (
      <>
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
                <div className="app">
                  <Router>
                    <RouterView />
                  </Router>
                </div>
            </PersistGate>
        </Provider>
      </ConfigProvider>
      </>
    );
  }
}
export default App;
