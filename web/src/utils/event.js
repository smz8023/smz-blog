/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */

class EventEmitter {
	_event = {};

	// 绑定
	on(eventName, handle) {
	  let listeners = this._event[eventName];
	  if (!listeners || !listeners.length) {
	    this._event[eventName] = [handle];
	    return;
	  }
	  listeners.push(handle);
	}
	// 移除
	off(eventName, handle) {
	  let listeners = this._event[eventName];
	  this._event[eventName] = listeners.filter(l => l !== handle);
	}
	// 分发消息
	emit(eventName, ...args) {
	  const listeners = this._event[eventName];
	  if (listeners && listeners.length) {
	    for (const l of listeners) {
	      l(...args);
	    }
	  }
	}
}
const z_event = new EventEmitter();
export {
  z_event
};