function identity<T> (arg : T) : T {
    return arg;
}
console.log(identity<string>('123'))

interface GenericNumber<T> {
    n : T
}
class AddNumber<T> implements GenericNumber<T> {
    n : T;
    add : (x : T, y : T) => T;
}

let gn = new AddNumber<number>()
gn.n = 10;
gn.add = (x : number, y : number) => {
    return (x + y) * gn.n;
}
console.log(gn.add(1, 1))


interface School<T> {
    add(n: T) : void;
}
class UserInfo{
    name: string;
    score: number;
    constructor(name: string, score: number) {
        this.name = name;
        this.score = score;
    }
    toString() {
        return `name: ${this.name}, score: ${this.score}`
    }
}
class Student implements School<UserInfo> {
    add(n: UserInfo) {
        console.log(n.toString())
    }
}
let userinfo = new UserInfo('zs', 150);
new Student().add(userinfo)




// 泛型约束
interface Lengthwise {
    length : number;
}
function loggingIdentity<T extends Lengthwise>(arg : T) {
    console.log(arg.length);
}

loggingIdentity([1, 2]);
loggingIdentity({length: 2, value: 5});
// loggingIdentity(3) // 泛型约束，参数必须有length属性



// 在泛型约束中使用类型参数
// keyof 索引类型查询操作符
function getProperty<T, K extends keyof T>(obj : T, key : K) : T[K] {
    return obj[key]
}

let x = {a: 1, b: 2, c: 3}
getProperty(x, "a"); // okay
// getProperty(x, "z"); // error: Argument of type 'z' isn't assignable to 'a' | 'b' | 'c' | 'd'.




// 在泛型里使用类类型
class Tree{
    name: string = '梧桐树';
}
function create<T>(c: {new() : T}) : T {
    return new c()
}
let tree = new Tree();
// console.log(create<Tree>(tree))


class BeeKeeper {
    hasMask: boolean;
}
class ZooKeeper {
    nametag: string;
}
class Animal {
    numLegs: number;
}
class Bee extends Animal{
    keeper: BeeKeeper;
}
class lion extends Animal{
    keeper: ZooKeeper;
}
function createInstance<T extends Animal>(c : new () => T) : T {
    return new c()
}
createInstance(Bee).keeper.hasMask
createInstance(lion).keeper.nametag

