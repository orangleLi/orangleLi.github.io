var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Control = /** @class */ (function () {
    function Control() {
        this.state = '0';
    }
    return Control;
}());
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.select = function () {
        console.log(this.state);
    };
    return Button;
}(Control));
new Button().select();
// 一个接口，继承了一个拥有private或protected类型成员的类，那这个接口只能被这个类或其子类所实现
// class Line implements SelectableControl {
//     select() {}
// }
var Parent = /** @class */ (function () {
    function Parent(name) {
        this.name = name;
    }
    return Parent;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child(name, age) {
        var _this = _super.call(this, name) || this;
        _this.age = age;
        return _this;
    }
    Child.prototype.getInfo = function () {
        console.log(this.name + ", " + this.age);
    };
    return Child;
}(Parent));
var child = new Child('zs', 24);
child.getInfo(); // zs 24
// console.log(child.name, child.age) // 实例对象不能直接访问protected类型成员
// readinly 只读
// 只读属性必须在声明时或构造函数里被初始化。
var Optopus = /** @class */ (function () {
    function Optopus(name, nameOfLegs) {
        this.name = name;
        this.nameOfLegs = nameOfLegs;
    }
    return Optopus;
}());
var o = new Optopus('zx', 11);
// o.nameOfLegs = 15; // 错误! nameOfLegs 是只读的.
var Octopus = /** @class */ (function () {
    function Octopus(name) {
        this.name = name;
        this.numberOfLegs = 8;
    }
    return Octopus;
}());
// 抽象类
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.move = function () {
        console.log('move');
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.makeSound = function () {
        console.log('makeSound');
    };
    Dog.prototype.eat = function () {
        console.log('eat');
    };
    return Dog;
}(Animal));
var animal; // 允许创建抽象类的引用
// animal = new Animal(); // 不允许实例化抽象类
animal = new Dog();
animal.makeSound();
animal.move(); // 可以直接调用抽象类中的方法
// animal.eat(); // 不能调用抽象类中不存在的方法
