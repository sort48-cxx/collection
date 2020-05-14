// flat方法
// 实现一层的遍历，把元素里的数组转为元素的子元素,并返回新的数组

var flatArr = [1, 2, 3, [4, [5, [6, 7]]]];
var newArr = flatArr.flat();
console.log(newArr);
console.log("============================");
////使用 reduce 实现数组的 flat 方法

Array.prototype.selfFlat = function (isDeepth) { //isDeepth:是否为彻底转换
	var arr = Array.prototype.slice.call(this);
	var newArr = [];
	arr.reduce(function (a, b, c) { //a:为返回值，b：下一项，c:下标
		return function deepth(arg) {
			if (arg instanceof Object) {
				for (var i = 0; i < arg.length; i++) {
					isDeepth ? deepth(arg[i]) : newArr.push(arg[i]);
				}
			} else {
				newArr.push(arg)
			}
		}(b)
	}, 0)
	return newArr;
}
var noDeepthNew = flatArr.selfFlat(false);
var DeepthNew = flatArr.selfFlat(true);
console.log(noDeepthNew);
console.log(DeepthNew);


console.log("============================");

//reduce (a,b,c) a:为返回值，b：下一项，c:下标

var reArr = [1, 2, 3];
console.log(reArr.reduce(function (a, b, c) {
	console.log(a, b, c);
	return a + b + c
}, 0));

console.log("============================");

Array.prototype.selfReduce = function (fn, content) {
	var arr = Array.prototype.slice.call(this);
	var i = "";
	if (typeof content === 'undefined') {
		i = 1;
		content = arr[0]
	} else {
		i = 0
	}
	for (; i < arr.length; i++) {
		content = fn.call(null, content, arr[i], i)
	}
	return content
}

console.log(reArr.selfReduce(function (a, b, c) {
	console.log(a, b, c);
	return b + a + c;
}, 0));

console.log("============================");

//工厂模式
function Person_1(name) {
	var p = new Object();
	p.name = name;
	p.sayName = function () {
		console.log(this.name);
	}
	return p;
}
var p1 = Person_1("P1");
p1.sayName();

//构造函数模式
function Person_2(name) {
	this.name = name;
	this.sayName = function () {
		console.log(this.name);
	}
}
var p2 = new Person_2("P2");
p2.sayName();

//构造函数优化模式
function Person_3(name) {
	this.name = name;
	this.sayName = sayName;
}

function sayName() {
	console.log(this.name);
}
var p3 = new Person_3("P3");
p3.sayName();

//原型模式
function Person_4() {}
Person_4.prototype.name = "Nike";
Person_4.prototype.sayName = function () {
	console.log(this.name);
}
var p4 = new Person_4();
p4.name = "P4";
p4.sayName();

//动态原型模式
function Person_5(name) {
	this.name = name;
	if (typeof this.name != "function") {
		Person_5.prototype.sayName = function () {
			console.log(this.name);
		}
	}
}
	var p5 = new Person_5("P5");
	p5.sayName();

	//组合模式
	function Person_6(name) {
		this.name = name;
	}

	Person_6.prototype = {
		contructor: Person_6,
		sayName: function () {
			console.log(this.name);
		}
	}
	var p6 = new Person_6("P6");
	p6.sayName();

	//寄生模式
	function Person_7(name) {
		var p = new Object();
		p.name = name;
		p.sayName = function () {
			console.log(this.name);
		}
		return p;
	}
	var p7 = new Person_7("P7");
	p7.sayName();


	//稳妥寄生模式
	function Person_8(name) {
		var p = new Object();
		p.sayName = function () {
			console.log(name);
		}
		return p;
	}
	var p8 = new Person_8("P8");
	p8.sayName();