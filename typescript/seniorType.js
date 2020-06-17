// 交叉类型
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var Loggable = /** @class */ (function () {
    function Loggable(log) {
    }
    Loggable.prototype.getLog = function () {
        console.log('log...');
    };
    return Loggable;
}());
function extend(first, second) {
    var result = {};
    // ts中for...in可以遍历实例对象的所有属性和方法，js中只能遍历实例对象的属性
    for (var id in first) {
        result[id] = first[id];
    }
    for (var id in second) {
        if (!result.hasOwnProperty(id)) {
            result[id] = second[id];
        }
    }
    return result;
}
var res = extend(new Person('zx'), new Loggable('log'));
console.log(res.name);
res.getLog();
