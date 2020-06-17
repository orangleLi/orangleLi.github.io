// 交叉类型
class Person {
    constructor(public name: string) {}
}
class Loggable {
    constructor(log: string) {}
    getLog() {
        console.log('log...')
    }
}
function extend<T, U>(first: T, second: U) : T & U {
    let result = <T & U>{};
    // ts中for...in可以遍历实例对象的所有属性和方法，js中只能遍历实例对象的属性
    for (let id in first) {
        (<any>result)[id] = first[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = second[id];
        }
    }
    return result;
}
let res = extend(new Person('zx'), new Loggable('log'))
console.log(res.name)
res.getLog()


// 联合类型
function padLeft(value: string, padding: string | number) {
    return `value: ${value}, padding: ${padding}`;
}
padLeft('left', 20)
padLeft('left', '20')
// padLeft('left', true) // 报错

// 如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。
class Fish {
    swim() {}
    layEggs() {}
}
class Brid {
    fly() {}
    layEggs() {}
}
function getSmallPet(): Fish | Brid {
    return new Fish()
}
getSmallPet().layEggs()
// getSmallPet().swim()

function isFish(pet: Fish | Brid): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}



// 类型别名
type Name = string;
type NameResolver = () => string;
type NameOrResolver = string | NameResolver;
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out'