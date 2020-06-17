// 类型
// boolean
let isDone: boolean = true;
// number   和JavaScript一样，TypeScript里的所有数字都是浮点数。 这些浮点数的类型是 number
let num = 6.1
let num1 = 10
let num2 = 0xf00d // 16进制
let num3 = 0b1010; // 二进制
let num4 = 0o744 // 八进制

// string

// 数组
let list: number[] = [1, 2, 3]
let list1: Array<number> = [1, 2, 3]
let list2: any[] = [1, 'hello', false]

// 元组
let tuple: [string, number];
tuple = ['str', 4]

// 枚举
// 默认从0开始编号, 可以手动的指定成员的数值
// Green指定2，后续自增
// 数字枚举
enum Color {Red, Green = 2, Blue}
let co: Color = Color.Red
let b: string = Color[1]
console.log(co) // 0
console.log(b, Color[2], Color[3]) // undefined 'Green' 'Blue'
// 字符串枚举
enum Direction {
    Up = 'UP',
    Down = 'DOWN'
}


// Any
let notSure: any = 1
notSure = false
notSure = 'hello'


// Void
function warnUser(): void{}

// Null Undefined
// TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。 和 void相似，它们的本身的类型用处不是很大：
// 默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。
// 然而，当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自
let u: undefined = undefined
let n: number
n = undefined

// Never
// never类型是任何类型的子类型，也可以赋值给任何类型；
// 然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。

// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}

// Object


// 类型断言
let ass = <string>''

let some: any = 'this is a string';
let ass1: number = (some as string).length
