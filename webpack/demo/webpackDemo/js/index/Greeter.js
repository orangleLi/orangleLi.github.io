var greeter = {
	sayHello: function () {
		var greet = document.createElement('div');
		greet.innerHTML = 'Hello!';
		return greet;
	}
}

module.exports = greeter;