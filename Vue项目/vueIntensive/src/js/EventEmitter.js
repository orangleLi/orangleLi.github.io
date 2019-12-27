class EventEmitter {
  constructor () {
    this._events = Object.create(null)
    this._eventcount = 0
    this._maxListeners = 10
  }
  /**
   * 为指定事件添加一个监听器到监听器数组的尾部
   * @param event 事件名 string
   * @param listener 回调函数 function
   */
  addListener (event, listener) {
    this.registerListener(event, listener)
  }
  registerListener (event, listener, head = false) {
    if (typeof listener !== 'function') {
      throw new TypeError('The listener must be a function')
    } else if (this._eventcount >= this._maxListeners) {
      throw new TypeError('Possible EventEmitter memory leak detected. ' +
        this._eventcount + ' ' + String(event) + ' listeners ' +
        'added. Use emitter.setMaxListeners() to ' +
        'increase limit')
    }
    if (!this._events[event]) {
      this._events[event] = []
    }
    this._eventcount++
    if (head) {
      this._events[event].unshift(listener)
    } else {
      this._events[event].push(listener)
    }
    return this
  }
  /**
   * 为指定事件添加一个监听器到监听器数组的头部
   * @param event 事件名 string
   * @param listener 回调函数 function
   */
  prependListener (event, listener) {
    this.registerListener(event, listener, true)
  }
  $on (event, listener) {
    this.addListener(event, listener)
  }
  /**
   * 为指定事件注册一个单次监听器，该监听器最多触发一次，触发后立即解除该监听器
   * @param event
   * @param listener
   */
  $once (event, listener) {
    const only = (...args) => {
      listener.apply(event, args)
      this.removeListener(event, listener)
    }
    this.addListener(event, only)
    return this
  }
  /**
   * 移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器
   * @param event
   * @param listener
   */
  removeListener (event, listener) {
    if (!this._events[event]) return this
    if (listener) {
      let fns = this._events[event].filter(fn => fn !== listener)
      if (fns.length < this._events[event].length) {
        this._eventcount--
      }
      this._events[event] = fns
    } else {
      delete this._events[event]
    }
    return this
  }
  $off (event, listener) {
    this.removeListener(event, listener)
  }
  /**
   * 移除指定事件的所有监听器，若无指定事件，则移除所有监听器
   * @param event
   */
  removeAllListener (event) {
    if (this._events[event]) {
      this._events[event].length = 0
    } else {
      this._events = Object.create(null)
    }
  }
  /**
   *  默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于提高监听器的默认限制的数量
   * @param n
   */
  setMaxListeners (n) {
    this._maxListeners = n
  }
  getMaxListeners () {
    return this._maxListeners
  }
  /**
   * 返回指定事件的监听器数组
   * @param event
   */
  listeners (event) {
    return this._events[event] || []
  }
  /**
   * 执行每个监听器，如果事件有注册返回true,未注册返回false
   * @param event
   */
  $emit (event, ...args) {
    if (!this._events[event]) {
      return this
    }
    let fns = this._events[event]
    fns.forEach(fn => fn.apply(this, args))
    return this
  }
}

export default EventEmitter
