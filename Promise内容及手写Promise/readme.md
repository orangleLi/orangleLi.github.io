# Promise及一步步实现自定义Promise

# Promise
不想看这部分的话，可以直接定位到[自定义Promise部分](#des)哦
## 内容
Promise是js中进行异步编程的解决方案

语法上：Promise是一个构造函数

功能上：Promise对象用来封装一个异步操作并可以获得其结果

## 状态
三种状态pending、resolved、rejected

pending -> resolved （成功）

pending -> rejected（失败）

状态只能改变一次，且不可逆

无论成功失败，都会有一个结果数据value or reason

## 流程

![](https://user-gold-cdn.xitu.io/2020/3/19/170f2142a4ecbf60?w=820&h=273&f=png&s=27416)
## 为什么引入Promise
1. 指定回调函数的方式更加灵活 <br>
传统回调函数，在调用异步操作之前，就得先指定回调函数
```
const success = () => {}
const fail  = () => {}
createAsyncFun(data, success, fail)
```
promise: 启动异步任务  => 返回promise对象  =>  给promise对象绑定回调函数（甚至可以在异步任务结束之后指定）

2. 支持链式调用，可以解决回到地狱问题

## 方法
### 1. Promise构造函数：Promise(excutor) {}
excutor函数：同步执行(resolve, reject) -> {} <br>
resolve函数：内部定义成功时调用的函数 value => {} <br>
reject函数：内部定义失败时调用的函数 reason => {} <br>

### 2. Promise.prototype.then()方法： (onResolved, onRejected) => {}
onResolved函数：成功的回调函数 value => {} <br>
onRejected函数：失败的回调函数 reason => {} <br>
说明：指定用于得到成功value的成功回调和用于得到失败reason的失败回调，返回一个新的promise对象

### 3. Promise.prototype.catch()：(onRejected) => {}
onRejected函数：失败的回调函数 reason => {} <br>
说明：then()的语法糖，相当于then(undefined, onRejected)

### 4. Promise.resolve方法：value => {}
value：成功的数据或promise对象 <br>
说明：返回一个成功/失败的promise对象

### 5. Promise。reject方法：reason => {}
reason：失败的原因 <br>
说明：返回一个失败的promise对象

### 6. Promise.all方法：promises => {}
promises：包含n个promise的数据 <br>
说明：有一个失败就失败

### 7. Promise.race方法：promises => {}
promises：包含n个promise的数据 <br>
说明：以第一个执行完成的结果为结果（看谁执行的快）

等等

[更多方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## 说明
Promise.prototype.then()、Promise.prototype.catch()  <br>
由实例对象调用，所以是挂在 `原型对象` 上的  <br>
Promise.resolve()、Promise.reject()、Promise.all()、Promise.race()  <br>
挂在 `函数对象` 上  <br>

## 如何改变promise的状态
1) resolve(value) ：如果当前是pending就会变为resolved
2) reject(value) ：如果当前是pending就会变为rejected 
3) 抛出异常：如果当前是pending就会变为rejected，抛出的是啥，reason就是啥

## 一个promise指定多个成功/失败回调函数，当promise改变为对应状态时都会调用

## 改变promse状态和指定回调函数谁先谁后？
 1) 都有可能，正常情况下时先指定回调函数再改变状态，但也可以先改状态再指定回调 <br>
 2) 如何先改状态再指定回调 <br>
	① 在执行器中直接调用resolve()/reject() <br>	
	② 延迟更长时间调用then() <br>
 2) 什么时候才能得到数据？ <br>
	① 如何先指定的回调，那当状态发生变化时，回调函数就会调用，得到数据 <br>	
	② 如果先改变的状态，那当指定回调时，回调函数就会调用，得到数据 <br>

```
// 先改状态，再指定回调
new Promise((resolve, reject) => {
    	resolve(1) // 先改变状态
}).then(
    value => { console.log(value) }, // 再指定回调
    reson => {}
)

const p = new Promise((resolve, reject) => {
	setTimeout(() => {  // 先改变状态
		resolve(1)	
	}, 1000)
})
setTimeout(() => {
	p.then(
		value => { console.log(value) }, // 再指定回调
		reson => {}
	)
}, 1100)

// 先指定回调，再改变状态
new Promise((resolve, reject) => {
	setTimeout(() => {  // 后改变状态
		resolve(1)	
	}, 1000)
}).then(
	value => { console.log(value) }, // 先指定回调
	reson => {}
)
```
## promise.then()返回的新promise的结果状态由什么决定？
1) 简单表达：由then()指定的回调函数执行的结果决定
2) 详细表达：  <br>
	 ① 如果抛出异常，新promise变为rejected，reason为抛出的异常  <br>
	 ② 如果返回的是非promise的任意值，新promise变为resolved，value为返回的值  <br>
	 ③ 如果返回的是另一个promise，此promise的结果就会成为新promise的结果  <br>
	
## promise异常传/穿透
1) 当使用promise的then链式调用时，可以在最后指定失败的回调  <br>
2) 前面任何操作出了异常，都会传到最后失败的回调中处理
```
new  Promise((resolve, reject) => {
  reject(1)
}).then(
  value => {
    console.log('onResolved1()', value)
    return 2
  }
).catch(
  value => {
    console.log('onRejected2()', value)
  }
).then(
  value => {
    console.log('onResolved2()', value)
  }
)
// 执行结果：
// onRejected2() 1
// onResolved2() undefined

// new Promise执行失败，执行onRejected(),但是onRejected()没有指定回调
// 相当于执行 reason => { throw reson } 或 reson => { return Promise.reject(reason) }
```
## 中断promise链		
1. 当使用promise的then链式调用时，在中间中断，不能调用后面的回调函数 <br>
2. 办法：在回调函数中返回一个pending状态的promise对象
```
new  Promise((resolve, reject) => {
  reject(1)
}).then(
  value => {
    console.log('onResolved1()', value)
    return 2
  },
  reason => {
    throw reason
  }
).catch(
  value => {
    console.log('onRejected2()', value)
    return new Promise(() => {}) // 返回一个pending状态的promise链
  }
).then(
  value => {
    console.log('onResolved2()', value)
  }
)
// onRejected2() 1
```
咔咔 内容终于介绍完了，现在开始实现自定义Promise

# <span id="des">自定义Promise</span>
Promsie基础用法
```
new Promise((resolve, reject) => {
    if (成功) {
        resolve(数据)
    } else {
        reject(数据)
    }
})
.then(
    value => {},
    reason => {}
)
```
## 先写构造函数
promise.js
```
// 接收一个执行器函数（同步执行）的参数
function Promise(excutor) {
    // 执行器函数接收两个参数（resolve, reject）
    // 立即同步执行执行器函数
    excutor(resolve, reject)
}
```
定义执行器的参数resolve、reject <br>
定义存储状态的变量status <br>
定义存储值的变量data <br>
定义存储回调函数的数据callbacks (数组每个元素是json结构 {onFulfilled(){}, onRejected() {}})
```
function Promise(excutor) {
	this.status = 'pending'; // 给promise对象指定status属性，初始值为pending
	this.data = null; // 给promise对象指定一个用于存储结果数据的属性
	this.callbacks = []; // 每个元素的结构： {onFulfilled() {}, onRejected() {}}
	
	const resolve = (value) => {}
	const reject = (reason) => {}
	
	excutor(resolve, reject)
}
```
完善resolve、reject
```
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
```
**Promise构造函数就写好了**

## then()方法

then()是挂在实例对象上的,并且接收两个参数，onFulfilled, onRejected

then()返回一个promise对象
```
Promise.prototype.then = (onFulfilled, onRejected) => {
	let promise2 = new Promise((resolve, reject) => {
	
	})
	return promise2;
}
```
判断状态
```
Promise.prototype.then = (onFulfilled, onRejected) => {
	let promise2 = new Promise((resolve, reject) => {
		if (this.status = 'resolved'){
			
		}
		else if (this.status = 'rejected') {
		    
		}
		else if (this.status = 'pending')  {
			
		}
	})
	return promise2;
}
```
status为resolved/rejected时，说明先改变状态，再执行的回调，此时应立即执行回调 <br>
status为pending时，此时还未改变状态，说明是先指定回调函数，再改变状态，所以要把回调函数存储起来
```
Promise.prototype.then = (onFulfilled, onRejected) => {
	let promise2 = new Promise((resolve, reject) => {
		if (this.status = 'resolved'){
			setTimeout(() => {
				try{
				    // 执行成功的回调onFulfilled
					let x = onFulfilled(this.data);
					// 2.2.7.1 onFulfilled 或 onRejected 执行的结果为x,调用 resolvePromise
					resolvePromise(promise2, x, resolve, reject)
				} catch(e){
					reject(e)
				}
			})
		}
		else if (this.status = 'rejected') {
		    setTimeout(() => {
				try{
				    // 执行失败的回调onRejected
					let x = onRejected(this.data);
					// 2.2.7.1 onFulfilled 或 onRejected 执行的结果为x,调用 resolvePromise
					resolvePromise(promise2, x, resolve, reject)
				} catch(e){
					reject(e)
				}
			})
		}
		else if (this.status = 'pending')  {
			// 此时还未改变状态，说明是先指定回调函数，再改变状态，所以要吧回调函数存储起来
			// callbacks数组每一项元素是一个json
			// 如果返回的结果是promise类型，那return的promise的结果就是返回的promise对象的结果
			// 所以这个要获取到promise执行的结果
			this.callbacks.push({
				onFulfilled: onFulfilled() {
					try{
						let x = onFulfilled(this.data);
						resolvePromise(promise2, x, resolve, reject)
					} catch(e){
						reject(e)
					}
				},
				onRejected: onRejected() {
					try{
						let x = onRejected(this.data);
						resolvePromise(promise2, x, resolve, reject)
					} catch(e){
						reject(e)
					}
				}
			})
		}
	})
	return promise2;
}
```
规范2.2.1.1 onFulfilled 必须是函数类型 <br>
规范2.2.1.2 onRejected 必须是函数类型 <br>
then()方法第一行添加以下代码 <br>
```
// 指定回调函数的默认值
onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value; // 向后传递成功的value
// 指定失败回调（实现异常传透的关键点）
onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason} // 向后传递失败的reason
```
重复的部分封装为handle
```
Promise.prototype.then = function(onFulfilled, onRejected) {

	// 指定回调函数的默认值
	onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value // 向后传递成功的value
	// 指定失败回调（实现异常传透的关键点）
	onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason} // 向后传递失败的reason

	let promise2 = new Promise((resolve, reject) => {
		const handle = (callback) => {
			/*
				如果抛出异常，那return的promise就失败，reason就是error
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
```
## Promise/A+规范（部分）
**2.3 resolvePromise** <br>
resolvePromise(promise2, x, resolve, reject) <br>
**2.3.1 如果 promise2 和 x 相等，那么 reject promise with a TypeError** <br>
**2.3.2 如果 x 是一个 promsie** <br>
```
2.3.2.1 如果x是pending态，那么promise必须要在pending,直到 x 变成 fulfilled or rejected.
2.3.2.2 如果 x 被 fulfilled, fulfill promise with the same value.
2.3.2.3 如果 x 被 rejected, reject promise with the same reason.
```
**2.3.3 如果 x 是一个 object 或者 是一个 function**

```
2.3.3.1 let then = x.then.
2.3.3.2 如果 x.then 这步出错，那么 reject promise with e as the reason..
2.3.3.3 如果 then 是一个函数，then.call(x, resolvePromiseFn, rejectPromise)
    2.3.3.3.1 resolvePromiseFn 的 入参是 y, 执行 resolvePromise(promise2, y, resolve, reject);
    2.3.3.3.2 rejectPromise 的 入参是 r, reject promise with r.
    2.3.3.3.3 如果 resolvePromise 和 rejectPromise 都调用了，那么第一个调用优先，后面的调用忽略。
    2.3.3.3.4 如果调用then抛出异常e 
        2.3.3.3.4.1 如果 resolvePromise 或 rejectPromise 已经被调用，那么忽略
        2.3.3.3.4.3 否则，reject promise with e as the reason
2.3.3.4 如果 then 不是一个function. fulfill promise with x.
```
**2.3.4 如果 x 不是一个 object 或者 function，fulfill promise with x.**
## resolvePromise实现
```
function resolvePromise(promise2, x, resolve, reject) {
	// 2.3.1 如果 promise2 和 x 相等，那么 reject promise with a TypeError
	if (promise2 === x) {
		reject(new TypeError('循环引用'))
	}
	// 2.3.3 如果 x 是一个 object 或者 是一个 function
	if (x && typeof x === 'object' || typeof x === 'function') {
	    // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 都调用了，那么第一个调用优先，后面的调用忽略。
	    // used保证只执行一次
		let used = false;
		// 2.3.3.1 let then = x.then.
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
		    // 2.3.3.2 如果 x.then 这步出错，那么 reject promise with e as the reason..
			if (used) return;
			used = true;
			reject(e)
		}
	} else {
	    // 2.3.4 如果 x 不是一个 object 或者 function，fulfill promise with x.
		resolve(x)
	}
}
```
resolvePromise()方法完成
## catch()方法
catch()是then()方法的语法糖
```
Promise.prototype.catch = function(onRejected) {
	return this.then(undefined, onRejected)
}
```

## 脚本测试

测试promise是否符合Promise/A+规范

安装测试脚本
```
npm install -g promises-aplus-tests
```
然后在promise.js中加入
```
Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}
module.exports = Promise;
```
执行命令 promises-aplus-tests 文件名
```
promises-aplus-tests promise.js
```
![](https://user-gold-cdn.xitu.io/2020/3/19/170f20d6ef873be9?w=296&h=50&f=png&s=715)
这样子就是测试通过了 <br>

以上代码通过完美全部测试用例

[源码](https://github.com/orangleLi/orangleLi.github.io/tree/master/Promise%E5%86%85%E5%AE%B9%E5%8F%8A%E6%89%8B%E5%86%99Promise)

## Promise.resolve()
```
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
```
## Promise.reject()
```
Promise.reject = (reason) => {
	return new Promise((resolve, reject) => {
		reject(reason)
	})
}
```
## Promise.all()
```
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
```
## Promise.race()
```
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
```

## 参考链接
[Promise-B站](https://www.bilibili.com/video/av77292118?p=1) <br>
[Promise/A+规范-翻译](https://juejin.im/post/5c88e427f265da2d8d6a1c84#heading-14) <br>
[Promise/A+规范 - 原文](https://promisesaplus.com/) <br>



