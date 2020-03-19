class Promise {
	constructor(excutor) {
		this.status = 'pending'; // 给promise对象指定status属性，初始值为pending
		this.data = null; // 给promise对象指定一个用于存储结果数据的属性
		this.callbacks = []; // 每个元素的结构： {onResolved() {}, onRejected() {}}

		const resolve = (value) => {
			// 状态只能改变一次，判断不是pending，就直接结束
			if (this.status !== 'pending') return;
			this.status = 'resolved';
			this.data = value;

			// 如果有待执行的callback函数，立即异步执行回调函数onResolved
			if (this.callbacks.length > 0) {
				this.callbacks.forEach((obj) => obj.onFulfilled(value))
			}
		}

		const reject = (reason) => {
			// 状态只能改变一次，判断不是pending，就直接结束
			if (this.status !== 'pending') return;
			this.status = 'rejected';
			this.data = reason;

			// 如果有待执行的callback函数，立即异步执行回调函数onResolved
			if (this.callbacks.length > 0) {
				this.callbacks.forEach((obj) => obj.onRejected(reason))
			}
		}

		try{
			excutor(resolve, reject)
		} catch(e) { // 如果执行器抛出异常，promise对象变为rejected状态
			reject(e)
		}
	}

	then(onFulfilled, onRejected) {

		// 指定回调函数的默认值
		onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value; // 向后传递成功的value
		// 指定失败回调（实现异常传透的关键点）
		onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason} // 向后传递失败的reason

		let promise2 = new Promise((resolve, reject) => {
			const handle = (callback) => {
				setTimeout(() => {
					/*
						1. 如果抛出异常，那return的promise就失败，reason就是error
						2. 如果返回的结果不是promise类型，那return的promise就成功，value就是返回的结果
						3. 如果返回的结果是promise类型，那return的promise的结果就是返回的promise对象的结果
					*/
					try{
						let x = callback(this.data);
						resolvePromise(promise2, x, resolve, reject)
					} catch(e) {
						reject(e)
					}
				})
			}
			// 说明先指定回调，再改变状态，此时存储回调函数
			if (this.status === 'pending') {
				this.callbacks.push({
					onFulfilled() {
						handle(onFulfilled)
					},
					onRejected() {
						handle(onRejected)
					}
				})
			} else if (this.status === 'resolved') { // 说明先改变状态，再执行回调，此时立即执行回调
				handle(onFulfilled)
			} else {
				handle(onRejected)
			}
		})
		return promise2;
	}
	catch(onRejected) {
		this.then(undefined, onRejected)
	}
}

function resolvePromise(promise2, x, resolve, reject) {
	if (promise2 === x) {
		reject(new TypeError('循环引用'))
	}
	if (x && typeof x === 'object' || typeof x === 'function') {
		let used = false;
		try {
			let then = x.then;
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

// 参数为一般值，则直接返回，参数若为promise对象，则返回promise对象的结果
Promise.resolve = (value) => {
	if (value instanceof Promise) {
		return value
	}
	return new Promise((resolve, reject) => {
		try {
			if (value && value.then && typeof value.then === 'function') {
				setTimeout(() => {
					value.then(resolve,reject)
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