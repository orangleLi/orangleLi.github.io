// 获取url参数
function formatNumber (n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}
export function formatTime (da) {
  let date = new Date(da);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}
export function getParam (search) {
  let q = {};
  search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => q[k] = v); // eslint-disable-line
  return q;
}
function oldWeek() {
	// 创建过去七天的数组
	return [...Array(7).keys()].map(days => new Date(Date.now() - 86400000 * days));
}
function nextWeek() {
	// 创建未来7天的数组
	return [...Array(7).keys()].map(days => new Date(Date.now() + 86400000 * days));
}
function mixArray(arr) {
	// 随机更改数组元素顺序，混淆数组
	let a = (arr) => arr.slice().sort(() => Math.random() - 0.5)
	return a(arr);
}
function randomColor() {
	 // 生成随机十六进制代码 如：'#c618b2'
	return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0');
}
function randomColor() {
	// 随机生成rgb颜色
	var col = [0, 1, 2];
	col[0] = Math.random() * 256;
	col[0] = col[0].toFixed();
	col[1] = Math.random() * 256;
	col[1] = col[1].toFixed();
	col[2] = Math.random() * 256;
	col[2] = col[2].toFixed();
	var num = Math.floor(Math.random() * 3);
	col[num] = 0;
	return "rgb(" + col[0] + "," + col[1] + "," + col[2] + ")";
}
/**
  * [function 判断是否为函数]
  * @param  {[type]} source [description]
  * @return {[type]}        [description]
  */
function isFunction(source) {
	return '[object Function]' === Object.prototype.toString.call(source);
};
 /**
  * [isIE 判断是不是ie]
  * @return {Boolean} [如果是ie返回版本号，不是则返回false]
  */
function isIE() {
	var myNav = navigator.userAgent.toLowerCase();
	return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
};

 /**
  * [function 对象浅复制]
  * @param  {[type]} dst [description]
  * @param  {[type]} obj [description]
  * @return {[type]}     [description]
  */
function extendFun(dst, obj) {
	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			dst[i] = obj[i];
		}
	}
};

 /**
  * [function 获取一个随机的5位字符串]
  * @param  {[type]} prefix [description]
  * @return {[type]}        [description]
  */
 function getName(prefix) {
     return prefix + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
 };

 /**
  * [function 在页面中注入js脚本]
  * @param  {[type]} url     [description]
  * @param  {[type]} charset [description]
  * @return {[type]}         [description]
  */
 function createScript(url, charset) {
     var script = document.createElement('script');
     script.setAttribute('type', 'text/javascript');
     charset && script.setAttribute('charset', charset);
     script.setAttribute('src', url);
     script.async = true;
     return script;
 };
function dis(x1, y1, x2, y2) {
	// 求两点之间的距离
	return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
}
function arrDuplicateRemoval(arr) {
	// 数组去重
	return [...new Set(arr)]
}
function filterNullValue(arr) {
	// 过滤 undefined,null,false,''
	// [1,2,0,undefined,null,false,'']
	return arr.filter(Boolean);
}
function mergeObj() {
	// 通过...延展操作符可以很容易的合并对象
	const person = { a:1 };
	const tools = { b:2 };
	const attributes = { c:3 };

	const summary = {...person, ...tools, ...attributes};
	console.log(summary)
}
function nonEmptyDetection() {
	const isRequired = () => { throw new Error('param is required'); };

	const hello = (name = isRequired()) => { console.log(`hello ${name}`) };


	// 抛出一个错误，因为参数没有传
	// hello();
	// 没有问题
	hello('hello')
}
function keyBoard() {
	// 用字符串返回一个键盘图形
	let a = (_=>[..."`1234567890-=~~QWERTYUIOP[]\\~ASDFGHJKL;'~~ZXCVBNM,./~"].map(x=>(o+=`/${b='_'.repeat(w=x<y?2:' 667699'[x=["BS","TAB","CAPS","ENTER"][p++]||'SHIFT',p])}\\|`,m+=y+(x+'    ').slice(0,w)+y+y,n+=y+b+y+y,l+=' __'+b)[73]&&(k.push(l,m,n,o),l='',m=n=o=y),m=n=o=y='|',p=l=k=[])&&k.join`
	`)()
	console.log(a)
}
