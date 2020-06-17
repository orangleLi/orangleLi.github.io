function identity(arg) {
    return arg;
}
console.log(identity('123'));
var AddNumber = /** @class */ (function () {
    function AddNumber() {
    }
    return AddNumber;
}());
var gn = new AddNumber();
gn.n = 10;
gn.add = function (x, y) {
    return (x + y) * gn.n;
};
console.log(gn.add(1, 1));
var UserInfo = /** @class */ (function () {
    function UserInfo(name, score) {
        this.name = name;
        this.score = score;
    }
    UserInfo.prototype.toString = function () {
        return "name: " + this.name + ", score: " + this.score;
    };
    return UserInfo;
}());
var Student = /** @class */ (function () {
    function Student() {
    }
    Student.prototype.add = function (n) {
        console.log(n.toString());
    };
    return Student;
}());
var userinfo = new UserInfo('zs', 150);
new Student().add(userinfo);
// // 泛型约束
// interface Lengthwise {
//     length : number;
// }
// function loggingIdentity<T extends Lengthwise>(arg : T) {
//     console.log(arg.length);
// }
// loggingIdentity([1, 2]);
// loggingIdentity({length: 2, value: 5});
// // loggingIdentity(3) // 泛型约束，参数必须有length属性
// // 在泛型约束中使用类型参数
// // keyof 索引类型查询操作符
// function getProperty<T, K extends keyof T>(obj : T, key : K) : T[K] {
//     return obj[key]
// }
// let x = {a: 1, b: 2, c: 3}
// getProperty(x, "a"); // okay
// // getProperty(x, "z"); // error: Argument of type 'z' isn't assignable to 'a' | 'b' | 'c' | 'd'.
// // 在泛型里使用类类型
// class BeeKeeper {
//     hasMask: boolean;
// }
// class ZooKeeper {
//     nametag: string;
// }
// class Animal {
//     numLegs: number;
// }
// class Bee extends Animal{
//     keeper: BeeKeeper;
// }
// class lion extends Animal{
//     keeper: ZooKeeper;
// }
// function createInstance<T extends Animal>(c : new () => T) : T {
//     return new c()
// }
// createInstance(Bee).keeper.hasMask
// createInstance(lion).keeper.nametag
