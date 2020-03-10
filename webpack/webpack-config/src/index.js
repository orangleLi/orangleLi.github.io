import './common/less/index.less';
import './common/css/header.css';
import './common/js/header.min.js';

class Animal {
	constructor(name) {
		this.name = name;
	}
	eat() {
		console.log(this.name + '在吃东西')
	}
}
const dog = new Animal('apple')
dog.eat()