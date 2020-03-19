/*
	自定义Promise函数模块：IIFE（立即调用函数表达式）
*/
// (function(){
	/*
		构造函数
	*/
	function Promise(excutor) {
		this.status = 'pending'; // 给promise对象指定status属性，初始值为pending
		this.data = null; // 给promise对象指定一个用于存储结果数据的属性
		this.callbacks = []; // 每个元素的结构： {onResolved() {}, onRejected() {}}

		const resolve = (value) => {
			// 状态只能改变一次，判断不是pending，就直接结束
			if (this.status !== 'pending') return;

			// 将状态改为resolved
			this.status = 'resolved';
			// 保存value数据
			this.data = value;

			// 如果有待执行的callback函数，立即异步执行回调函数onResolved
			if (this.callbacks.length > 0) {
				setTimeout(() => { // 放入队列中执行所有成功的回调
					this.callbacks.forEach(callbacksObj => {
						callbacksObj.onResolved(value)
					})
				})
			}
		}
		const reject = (reason) => {
			// 状态只能改变一次，判断不是pending，就直接结束
			if (this.status !== 'pending') return;

			// 将状态改为rejected
			this.status = 'rejected';
			// 保存reason数据
			this.data = reason;

			// 如果有待执行的callback函数，立即异步执行回调函数onRejected
			if (this.callbacks.length > 0) {
				setTimeout(() => { // 放入队列中执行所有成功的回调
					this.callbacks.forEach(callbacksObj => {
						callbacksObj.onRejected(reason)
					})
				})
			}
		}
		try{
			excutor(resolve, reject)
		} catch (error) { // 如果执行器抛出异常，promise对象变为rejected状态
			reject(error)
		}
	}
	/*
	Promise原型对象的then()
	指定成功和失败的回调函数
	返回一个新的promise对象
	返回promise的结果由onResolved/onRejected执行结果决定
	*/
	Promise.prototype.then = function(onResolved, onRejected) {

		// 指定回调函数的默认值
		onResolved = typeof onResolved === 'function' ? onResolved : value => value // 向后传递成功的value
		// 指定失败回调（实现异常传透的关键点）
		onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason} // 向后传递失败的reason

		let promise2 = new Promise((resolve, reject) => {
			const handle = (callback) => {
				/*
					1. 如果抛出异常，那return的promise就失败，reason就是error
					2. 如果返回的结果不是promise类型，那return的promise就成功，value就是返回的结果
					3. 如果返回的结果是promise类型，那return的promise的结果就是返回的promise对象的结果
				*/
				try {
					// const result = callback(this.data)
					// if (result instanceof Promise) {
					// 	// result.then(
					// 	// 	value => resolve(value),
					// 	// 	reason => rejecte(reason)
					// 	// )
					// 	result.then(resolve, reject) // 上面代码的简洁写法
					// } else {
					// 	resolve(result)
					// }
					let x = callback(this.data)
					resolvePromise(promise2, x, resolve, reject)
				} catch (error) {
					reject(error)
				}
			}
			if (this.status === 'pending') { // 说明先指定回调，再改变状态，此时存储回调函数
				this.callbacks.push({
					onResolved () {
						handle(onResolved)
					},
					onRejected () {
						handle(onRejected)
					}
				})
			} else if (this.status === 'resolved') { // 说明先改变状态，再执行回调，此时立即执行回调
				setTimeout(() => {
					handle(onResolved)
				})
			} else { // 'rejected'
				setTimeout(() => {
					handle(onRejected)
				})
			}
		})
		return promise2;
	}

	function resolvePromise(promise2, x, resolve, reject) {
		if (promise2 === x) {
			reject(new TypeError('循环引用'))
		}
		if (x && typeof x === 'object' || typeof x === 'function') {
			let used = false;
			try{
				let then = x.then;
				if (typeof then === 'function') {
					then.call(x,
						y => {
							if (used) return;
							used = true;
							resolvePromise(promise2, y, resolve, reject);
						},
						r => {
							if (used) return;
							used = true;
							reject(r)
						}
					)
				} else {
					if (used) return;
					used = true;
					resolve(x)
				}
			} catch(e) {
				if (used) return;
				used = true;
				reject(e)
			}
		} else {
			resolve(x)
		}
	}


	Promise.prototype.catch = function(onRejected) {
		return this.then(undefined, onRejected)
	}

	// 参数为一般值，则直接返回，参数若为promise对象，则返回promise对象的结果
	Promise.resolve = function(value) {
		return new Promise((resolve, reject) => {
			try {
				if (value instanceof Promise) {
					value.then(resolve, reject)
				} else {
					resolve(value)
				}
			} catch (error) {
				reject(error)
			}
		})
	}

	// 返回一个带有拒绝原因的Promise对象。
	Promise.reject = function(reason) {
		// 返回一个失败状态的promise
		return new Promise((resolve, reject) => {
			reject(reason)
		})
	}

	Promise.all = function(promises) {
		let values = [];
		return new Promise((resolve, reject) => {
			if (promises.length === 0) {
				resolve(values)
			}
			promises.forEach((item, index) => {
				Promise.resolve(item).then(
					value => {
						values[index] = value;
						if (values.length === promises.length) {
							resolve(values)
						}
					},
					reason => {
						reject(reason)
					}
				)
			})
		})
	}

	// 返回一个promise，其结果由第一个完成的promise决定
	Promise.race = function(promises) {
		return new Promise((resolve, reject) => {
			promises.forEach((item, index) => {
				Promise.resolve(item).then(
					value => { // 一旦有成功了，将return变为成功
						resolve(value)
					},
					reason => { // 一旦有失败了，将return变为失败
						reject(reason)
					}
				)
			})
		})
	}
	
	Promise.defer = Promise.deferred = function () {
		let dfd = {};
		dfd.promise = new Promise((resolve, reject) => {
			dfd.resolve = resolve;
			dfd.reject = reject;
		});
		return dfd;
	}
	module.exports = Promise;

	// 外部暴露Promise
// 	window.Promise = Promise;
// })(window)