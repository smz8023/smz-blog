/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-console */
import React,{useCallback,useState,useEffect } from "react";
import ReactDOM from "react-dom";
import App from "@container/App";
import "@common/common.less";
// eslint-disable-next-line no-unused-vars
import { z_event } from "@utils/event.js";
import * as serviceWorker from "./serviceWorker";
// eslint-disable-next-line no-unused-vars

(function(history){
  var pushState = history.pushState;

  history.pushState = function(state) {
      if (typeof history.onpushstate == "function") {
     
          history.onpushstate({state: state});
      }
     
      z_event.emit("lodingopen", true);
      z_event.emit("lodingclose", false, 1200);

      return pushState.apply(history, arguments);
  }
})(window.history);
window.onload = function() {
  z_event.emit("lodingclose", false, 1200);
};

// console.log(document.cookie)
const piWorker = new Worker('./worker.js', { type: 'module' });
piWorker.onmessage = event => {
  console.log(event.data);
};
// 向worker 区 发送数据
// piWorker.postMessage(42);
// eslint-disable-next-line react/jsx-filename-extension

// function listen () {
//   alert(2234)
//   if (document.readyState == 'complete') { // 资源加载完成
   
//      ReactDOM.render(<App />, document.getElementById("root"));
//   } else { // 资源加载中
//     alert(1111)
//       ReactDom.render(
//           <A />,
//           document.getElementById('root')
//       )
//   }
// }

// document.onreadystatechange = listen
const App2 = (props)=>{
let [cont,setCont] = useState(0);
useEffect(()=>{
  console.log('这里执行的');
  // 
  return ()=>{
 
    //清除上一次的副作用
    console.log('先这里执行的2')

  }
})
  return <div>
    {cont}
    <br />
    {console.log('这里什么时候执行')}
    <button onClick={()=>setCont(cont+1)}>点击测试</button>
  </div>
}
ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
