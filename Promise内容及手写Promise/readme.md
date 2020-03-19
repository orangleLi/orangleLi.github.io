# Promise及一步步实现自定义Promise

## Promise

### 内容
Promise是js中进行异步编程的解决方案

语法上：Promise是一个构造函数

功能上：Promise对象用来封装一个异步操作并可以获得其结果

### 状态
三种状态pending、resolved、rejected

pending -> resolved （成功）

pending -> rejected（失败）

状态只能改变一次，且不可逆

无论成功失败，都会有一个结果数据value or reason

### 流程

### 为什么引入Promise
1. 指定回调函数的方式更加灵活
2. 支持链式调用，可以解决回到地狱问题

### 方法
#### 1. Promise构造函数：Promise(excutor) {}
excutor函数：同步执行(resolve, reject) -> {} <br>
resolve函数：内部定义成功时调用的函数 value => {} <br>
reject函数：内部定义失败时调用的函数 reason => {} <br>

#### 2. Promise.prototype.then()方法： (onResolved, onRejected) => {}
onResolved函数：成功的回调函数 value => {} <br>
onRejected函数：失败的回调函数 reason => {} <br>
说明：指定用于得到成功value的成功回调和用于得到失败reason的失败回调，返回一个新的promise对象

#### 3. Promise.prototype.catch()：(onRejected) => {}
onRejected函数：失败的回调函数 reason => {} <br>
说明：then()的语法糖，相当于then(undefined, onRejected)

#### 4. Promise.resolve方法：value => {}
value：成功的数据或promise对象 <br>
说明：返回一个成功/失败的promise对象

#### 5. Promise。reject方法：reason => {}
reason：失败的原因 <br>
说明：返回一个失败的promise对象

#### 6. Promise.all方法：promises => {}
promises：包含n个promise的数据 <br>
说明：有一个失败就失败

#### 7. Promise.race方法：promises => {}
promises：包含n个promise的数据 <br>
说明：以第一个执行完成的结果为结果（看谁执行的快）

then()、catch()  <br>
由实例对象调用，所以是挂在原型对象上的  <br>
resolve()、reject()、all()、race()  <br>
挂在函数对象上  <br>

### 如何改变promise的状态
1) resolve(value) ：如果当前是pending就会变为resolved
2) reject(value) ：如果当前是pending就会变为rejected 
3) 抛出异常：如果当前是pending就会变为rejected，抛出的是啥，reson就是啥

### 一个promise指定多个成功/失败回调函数，当promise改变为对应状态时都会调用

### 改变promse状态和指定回调函数谁先谁后？
 1) 都有可能，正常情况下时先指定回调函数再改变状态，但也可以先改状态再指定回调 <br>
 2) 如何先改状态再指定回调 <br>
	① 在执行器中直接调用resolve()/reject() <br>	
	② 延迟更长时间调用then() <br>
 2) 什么时候才能得到数据？ <br>
	① 如何先指定的回调，那当状态发生变化时，回调函数就会调用，得到数据 <br>	
	② 如果先改变的状态，那当指定回调时，回调函数就会调用，得到数据 <br>

```
代码
```
### promise.then()返回的新promise的结果状态由什么决定？
1) 简单表达：由then()指定的回调函数执行的结果决定
2) 详细表达：  <br>
	 ① 如果抛出异常，新promise变为rejected，reason为抛出的异常
	 
	 ② 如果返回的是非promise的任意值，新promise变为resolved，value为返回的值
	 
	 ③ 如果返回的是另一个promise，此promise的结果就会成为新promise的结果
	
### promise异常传/穿透

### 中断promise链		
	
## 自定义Promise

### 先写一个整体结构（各种方法）
```
new Promise((resolve, reject) => {

})
```
// 接收一个执行器函数（同步执行）的参数

// 执行器函数接收两个参数（resolve, reject）

// 立即同步执行执行器函数
```
function Promise(excutor) {
	excutor(resolve, reject)
}
```
```
function Promise(excutor) {
	this.status = 'pending'
	this.data;
	this.callbacks = [];
	const resolve = (value) => {}
	const reject = (reason) => {}
	excutor(resolve, reject)
}
```
上文有提到过，可能先指定回调，再改变状态

// 判断当有回调函数时，异步执行回调
```
function Promise(excutor) {
	this.status = 'pending'
	this.data;
	this.callbacks = [];
	
	const resolve = (value) => {
		
	}
	const reject = (reason) => {}
	// 如果执行器抛异常，promise变为失败的状态
	try{
		excutor(resolve, reject)
	} catch(e) {
		reject(e)
	}
}
```
Promise构造函数就写好了

then()方法

then()是挂在实例对象上的,并且接收两个参数，onFulfilled, onRejected

then()返回一个promise对象
```
Promise.prototype.then = (onFulfilled, onRejected) => {
	return new Promise((resolve, reject) => {
	
	})
}
```
// 判断状态
```
Promise.prototype.then = (onFulfilled, onRejected) => {
	let promise2 = new Promise((resolve, reject) => {
		if (this.status = 'resolved'){
			setTimeout(() => {
				try{
					let x = onFulfilled(this.data);
					resolvePromise(promise2, x, resolve, reject)
				} catch(e){
					reject(e)
				}
			})
		}
		else if (this.status = 'rejected') {}
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
// onFulfilled, onRejected必须是函数
// 2.2.1.1 onFulfilled 必须是函数类型
// 2.2.1.2 onRejected 必须是函数类型
// 异常穿透

// 指定回调函数的默认值
onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value; // 向后传递成功的value
// 指定失败回调（实现异常传透的关键点）
onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason} // 向后传递失败的reason

// 重复的部分封装handle

Promise/A+规范

```
2.3 resolvePromise
resolvePromise(promise2, x, resolve, reject)
2.3.1 如果 promise2 和 x 相等，那么 reject promise with a TypeError
2.3.2 如果 x 是一个 promsie
2.3.2.1 如果x是pending态，那么promise必须要在pending,直到 x 变成 fulfilled or rejected.
2.3.2.2 如果 x 被 fulfilled, fulfill promise with the same value.
2.3.2.3 如果 x 被 rejected, reject promise with the same reason.
2.3.3 如果 x 是一个 object 或者 是一个 function
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
2.3.4 如果 x 不是一个 object 或者 function，fulfill promise with x.

```
```
function resolvePromise(promise2, x, resolve, reject) {
	// 2.3.1 如果 promise2 和 x 相等，那么 reject promise with a TypeError
	if (promise2 === x) {
		reject(new TypeError('循环引用'))
	}
	// 2.3.3 如果 x 是一个 object 或者 是一个 function
	if (x && typeof x === 'object' || typeof x === 'function') {
		let used = false;
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
		resolve(x)
	}
	...
	// 2.3.4 如果 x 不是一个 object 或者 function，fulfill promise with x.
}
```


catch()是then()方法的语法糖

测试

### 脚本测试

测试promise是否符合Promise/A+规范

首先在promise代码中加入

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
安装测试脚本

npm install -g promises-aplus-tests

执行命令 promises-aplus-tests 文件名

promises-aplus-tests promise.js









