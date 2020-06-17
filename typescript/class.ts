class Control {
    protected state : string = '0';
}
// 接口同样会继承到类的private和protected成员
interface SelectableControl extends Control {
    select() : void;
}

class Button extends Control implements SelectableControl {
    select() {
        console.log(this.state)
    }
}
new Button().select()

// 一个接口，继承了一个拥有private或protected类型成员的类，那这个接口只能被这个类或其子类所实现
// class Line implements SelectableControl {
//     select() {}
// }




class Parent {
    protected name : string;
    constructor(name : string) {
        this.name = name
    }
}
class Child extends Parent {
    age : number;
    constructor(name : string, age : number) {
        super(name);
        this.age = age;
    }
    getInfo() {
        console.log(`${this.name}, ${this.age}`)
    }
}
let child = new Child('zs', 24)
child.getInfo(); // zs 24
// console.log(child.name, child.age) // 实例对象不能直接访问protected类型成员

class Tree {
    constructor(public name: string) {}
    getInfo() {
        return this.name;
    }
}
console.log(new Tree('梧桐').getInfo()) // 梧桐


// readinly 只读
// 只读属性必须在声明时或构造函数里被初始化。
class Optopus {
    readonly name : string;
    readonly nameOfLegs : number;
    constructor(name : string, nameOfLegs : number) {
        this.name = name;
        this.nameOfLegs = nameOfLegs;
    }
}
let o = new Optopus('zx', 11)
// o.nameOfLegs = 15; // 错误! nameOfLegs 是只读的.
class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {
    }
}




// 抽象类
abstract class Animal {
    abstract makeSound() : void;
    move() : void {
        console.log('move')
    }
}

class Dog extends Animal {
    makeSound() : void { // 子类中必须对抽象类中的抽象方法进行实现
        console.log('makeSound')
    }
    eat() : void {
        console.log('eat')
    }
}
let animal : Animal; // 允许创建抽象类的引用
// animal = new Animal(); // 不允许实例化抽象类
animal = new Dog();
animal.makeSound()
animal.move(); // 可以直接调用抽象类中的方法
// animal.eat(); // 不能调用抽象类中不存在的方法