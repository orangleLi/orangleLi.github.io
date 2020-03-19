function Promise(excutor) {
	this.status = 'pending'; // 给promise对象指定status属性，初始值为pending
	this.data = null; // 给promise对象指定一个用于存储结果数据的属性
	this.callbacks = []; // 每个元素的结构： {onFulfilled() {}, onRejected() {}}
	
	const resolve = (value) => {
		// 状态只能改变一次，判断不是pending，就直接结束
		if (this.status !== 'pending') return;
		
		// 将状态改为resolved
		this.status = 'resolved';
		// 保存value数据
		this.data = value;
		
		// 如果有待执行的callback函数，立即异步执行回调函数onFulfilled
		if (this.callbacks.length > 0) {
			setTimeout(() => {
			    this.callbacks.forEach(callbacksObj => {
			        callbacksObj.onFulfilled(value)
			    })
			})
		}
	}
	
	// reject与resolve类似
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
	
	// 如果执行器抛异常，promise变为失败的状态
	try{
		excutor(resolve, reject)
	} catch(e) {
		reject(e)
	}
}

Promise.prototype.then = function(onFulfilled, onRejected) {

	// 指定回调函数的默认值
	onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value // 向后传递成功的value
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
				// 执行失败的回调onRejected
				let x = callback(this.data);
				// 2.2.7.1 onFulfilled 或 onRejected 执行的结果为x,调用 resolvePromise
				resolvePromise(promise2, x, resolve, reject)
			} catch (error) {
				reject(error)
			}
		}
		if (this.status === 'pending') { // 说明先指定回调，再改变状态，此时存储回调函数
			this.callbacks.push({
				onFulfilled () {
					handle(onFulfilled)
				},
				onRejected () {
					handle(onRejected)
				}
			})
		} else if (this.status === 'resolved') { // 说明先改变状态，再执行回调，此时立即执行回调
			setTimeout(() => {
				handle(onFulfilled)
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
	// 2.3.1 如果 promise2 和 x 相等，那么 reject promise with a TypeError
	if (promise2 === x) {
		reject(new TypeError('循环引用'))
	}
	// 2.3.3 如果 x 是一个 object 或者 是一个 function
	if (x && typeof x === 'object' || typeof x === 'function') {
		let used = false;  // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 都调用了，那么第一个调用优先，后面的调用忽略。
		// 2.3.3.1 let then = x.then.
		// 2.3.3.2 如果 x.then 这步出错，那么 reject promise with e as the reason..
		try{
			let then = x.then
			// 2.3.3.3 如果 then 是一个函数，then.call(x, resolvePromiseFn, rejectPromise)
			if (typeof then === 'function') {
				then.call(x,
					y => {
						if (used) return;
						used = true;
						resolvePromise(promise2, y, resolve, reject)
					},
					r => {
						if (used) return;
						used = true;

						reject(r)
					}
				)
			} else {
				// 2.3.3.4 如果 then 不是一个function. fulfill promise with x.
				if (used) return;
				used = true;

				resolve(x)
			}
		} catch(e){
			if (used) return;
			used = true;
			reject(e)
		}
	} else {
	    // 2.3.4 如果 x 不是一个 object 或者 function，fulfill promise with x.
		resolve(x)
	}
}


Promise.prototype.catch = function(onRejected) {
	return this.then(undefined, onRejected)
}

// 参数为一般值，则直接返回，参数若为promise对象，则返回promise对象的结果
Promise.resolve = (value) => {
	if (value instanceof Promise) {
		return value
	}
	return new Promise((resolve, reject) => {
		try {
			if (value && value.then && typeof value.then === 'function') {
				setTimeout(() => {
					// value.then(
					// 	value => {
					// 		resolve(value)
					// 	},
					// 	reason => {
					// 		reject(reason)
					// 	}
					// )
					value.then(resolve,reject) // 上面代码的简写
				})
			} else {
				resolve(value)
			}
		} catch(e) {
			reject(e)
		}
	})
}

Promise.reject = (reason) => {
	return new Promise((resolve, reject) => {
		reject(reason)
	})
}

Promise.all = (promises) => {
	return new Promise((resolve, reject) => {
		if (promises && promises.length === 0) {
			resolve([])
		} else {
			let values = [];
			promises.forEach((fn, index) => {
				Promise.resolve(fn).then(
					value => {
						values[index] = value
						if (values.length === promises.length) {
							resolve(values)
						}
					},
					reason => {
						reject(reason)
					}
				)
			})
		}
	})
}


Promise.race = (promises) => {
	return new Promise((resolve, reject) => {
		promises.forEach((fn, index) => {
			Promise.resolve(fn).then(
				value => {
					resolve(value)
				},
				reason => {
					reject(reason)
				}
			)
		})
	})
}


// Promise.defer = Promise.deferred = function () {
// 	let dfd = {};
// 	dfd.promise = new Promise((resolve, reject) => {
// 		dfd.resolve = resolve;
// 		dfd.reject = reject;
// 	});
// 	return dfd;
// }
// module.exports = Promise;