// 类型
// boolean
var isDone = true;
// number   和JavaScript一样，TypeScript里的所有数字都是浮点数。 这些浮点数的类型是 number
var num = 6.1;
var num1 = 10;
var num2 = 0xf00d; // 16进制
var num3 = 10; // 二进制
var num4 = 484; // 八进制
// string
// 数组
var list = [1, 2, 3];
var list1 = [1, 2, 3];
var list2 = [1, 'hello', false];
// 元组
var tuple;
tuple = ['str', 4];
// 枚举
// 默认从0开始编号
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var c = Color.Red;
var b = Color[1];
console.log(c); // 0
console.log(b, Color[2], Color[3]); // undefined Green Blue
