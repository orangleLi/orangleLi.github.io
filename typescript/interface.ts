function test(str : string) {
	console.log(str)
}
test('hello typescript')

// 接口一般用来抽象动作
// 类是对根源的抽象
// interface Person仅做演示

interface Person {
	name : string;
	sex : string;
	age : number;
}

function printPerson(p : Person){
	console.log(`${p.name}, ${p.sex}, ${p.age}`)
}
printPerson({name: 'zs', sex: 'male', age: 25})


// 可选属性
interface Animal {
	name?: string,
	age?: number
}
function printAnimal(a : Animal) {
	console.log(`${a.name ? a.name : ''}${a.age ? ', ' + a.name : ''}`)
}
printAnimal({name : 'apple'})

// 函数返回值
function returnFun(a : Animal) : string {
	let name : string = `ta 的名字是${a.name}`;
	return name;
}
console.log(returnFun({name : 'pink'}))

// 函数类型
interface Fun {
	// (参数 ： 类型) ： 返回值
	(name : string, age : number) : string;
}

let f : Fun = (name : string, age : number) : string => {
	return `${name}, ${age}`
}

console.log(f('lisi', 25))

// dictionary模式
// 所有属性与其返回值类型相匹配,否则会提示错误
// interface eat{
// 	[index : string] : string;
// 	length : number; // 索引类型的返回值为string，所以这里报错了
// 	name : string;
// 	age : string;
// 	sex : string
// }

// 类实现接口
// interface ClockInterface {
// 	time : Date;
// 	setTime(d : Date);
// }

// class Clock implements ClockInterface {
// 	time : Date;
// 	setTime(d : Date) {
// 		this.time = d;
// 	}
// }

interface ClockConstructor {
	new (hour : number, minute : number);
}
interface ClockInterface {
	tick();
}
class DigitalClock implements ClockInterface {
	constructor(hour : number, minute : number) {}
	tick() {
		console.log('DigitalClock')
	}
}
class AnalogClock implements ClockInterface {
	constructor(hour : number, minute : number) {}
	tick() {
		console.log('AnalogClock')
	}
}

function createClock(clock : ClockConstructor, hour : number, minute : number) {
	return new clock(hour, minute);
}

let d = createClock(DigitalClock, 1, 25)
let a = createClock(AnalogClock, 2, 15)
d.tick(); // DigitalClock
a.tick(); // AnalogClock

// 接口也可以继承，一个接口可以继承多个接口
interface Shape {
	color : string;
}
interface penStroke {
	penWidth : number;
}
interface Square extends Shape, penStroke {
	sideLength : number
}
let square = <Square>{color : 'red', sideLength : 20}
// let s = <Square>{} 泛型 表示定义一个Square类型的数据，初始值为{}
square.sideLength = 15;
console.log(square);

let s = <Square>{};
s.color = 'pink';
s.penWidth = 10;
s.sideLength = 8;
console.log(s);

// 混合类型
interface Counter{
	(start : number) : string;
	interval : number;
	reset() : void;
}
function getCounter(interval : number) : Counter {
	let counter = <Counter> function (start : number) {
		console.log(`start: ${start}`)
	}
	counter.interval = interval;
	counter.reset = () => {
		console.log(`interval: ${interval}`)
	}
	return counter;
}

let c = getCounter(1000);
c(10)
console.log(c)
