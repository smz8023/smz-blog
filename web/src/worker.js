import { calculatePi } from './test';
// 监听主线程 
console.log(self.type)
addEventListener('message', event => {
  console.log('event.data',event.data)
  postMessage(calculatePi(event.data));
});
postMessage(calculatePi());