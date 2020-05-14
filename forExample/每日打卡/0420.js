//工厂模式
function per1(name) {
	var p1 = new Object();
	p1.name = "P1";
	p1.sayname = function () {
		console.log(this.name)
	}
	return p1;
}
var p1 = per1();
p1.sayname();

//构造函数模式
function per2(name) {
	this.name = name;
	this.sayname = function () {
		console.log(this.name)
	}
}
var p2 = new per2("P2");
p2.sayname();

//构造函数优化模式
function per3(name) {
	this.name = name;
	this.sayname = sayname
}

function sayname() {
	console.log(this.name)
}

var p3 = new per3("P3");
p3.sayname();

//原型模式
function per4() {}

per4.prototype.sayname = function () {
	console.log(this.name);
}
var p4 = new per4();
p4.name = "P4";
p4.sayname();

//动态原型模式
function per6(name) {
	this.name = name;
	if (typeof this.sayname != 'function') {
		per6.prototype.sayname = function () {
			console.log(this.name);
		}
	}
}

var p6 = new per6("P6");
p6.sayname();

//组合模式
function per5(name) {
	this.name = name;
}
per5.prototype = {
	constructor: per5,
	sayname: function () {
		console.log(this.name);
	}
}

var p5 = new per5("P5");
p5.sayname();

//寄生模式
function per7(name) {
	var p7 = new Object();
	p7.name = "P7";
	p7.sayname = function () {
		console.log(this.name)
	}
	return p7;
}
var p7 = new per7();
p7.sayname();

//稳妥寄生模式
function per8(name) {
	var p8 = new Object();
	p8.sayname = function () {
		console.log(name)
	}
	return p8;
}
var p8 = new per8("P8");
p8.sayname();

//简易的 CO 模块
//特点：利用Generator生成一个构造器，然后调用next（）方法，每次返回一个promise的结构。

//generator的正常使用
function* run() {
	yield 'Hello';
	yield 'world';
	return true;
}

var itrun = run();
var it_step1 = itrun.next();
console.log(it_step1); //{value: "Hello", done: false}
var it_step2 = itrun.next();
console.log(it_step2); //{value: "world", done: false}
var it_step3 = itrun.next();
console.log(it_step3); //{value: true, done: true}

console.log("==================================");

/**模拟实现 */
function selfGenerator(fun) {
	var it_generator = fun();
	var result = it_generator.next();

	return new Promise((resolve, reject) => {
		const next = function (result) {
			if (result.done) {
				resolve(result.value)
			}
			result.value = makePromisify(result.value)
			result.value.then(res => {
				let result = it_generator.next(res);
				next(result);
			}).catch(err => {
				reject(err)
			})

		}
		next(result);
	})
}

function makePromisify(source) {
	if (source.then && typeof source.then === "function") return source
	return Promise.resolve(source)
}

/**参考实现 */
// function run1(generatorFunc) {
// 	let it = generatorFunc();
// 	let result = it.next();

// 	return new Promise((resolve, reject) => {
// 			const next = function (result) {
// 					if (result.done) {
// 							resolve(result.value)
// 					}
// 					//保证返回的是一个promise
// 					result.value = makePromisify(result.value)
// 					result.value.then(res => {
// 							//将promise的返回值res传入iterator迭代器的next方法中,作为yield后面表达式的返回值
// 							//it.next将停止的yield继续执行到下一个yield,返回的result是一个value,done属性组成的对象
// 							let result = it.next(res)
// 							//递归执行next函数
// 							next(result)
// 					}).catch(err => {
// 							reject(err)
// 					})
// 			}
// 			next(result)
// 	})
// }

function* selfrun() {
	let res1 = yield 'Hello';
	// console.log(res1);
	yield 'world';
	// return true;
}

selfGenerator(selfrun);


/**继承 */
// 1. 原型链继承
function sup1(name) {
	this.name = "sup1"
}

function sub1() {}

sub1.prototype = new sup1();
var subb1 = new sub1();
console.log(subb1.name);

// 2. 借用构造函数继承
function sup2(name) {
	this.name = "sup2";
}

function sub2() {
	sup2.call(this);
}
var subb2 = new sub2();
console.log(subb2.name);

// 3. 组合继承
function sup3(name) {
	this.name = "sup3";
}

function sub3() {
	sup3.call(this)
}

sub3.prototype = new sup3();
sub3.constructor = sub3;
var subb3 = new sub3();
console.log(subb3.name);

// 4. 原型式继承
function sup4(o) {
	function f() {}
	f.prototype = o;
	return new f();
}

var sub4 = {
	name: 'sup4'
}
var subb4 = new sup4(sub4);
console.log(subb4.name);

// 5. 寄生式继承
// 6. 寄生组合式继承 （借用构造函数+原型链继承）

//数组去重
var array = [1, 1, '1', '1',2,5,2,3];
function unArr(array) {
	var newArr = [];
	for (var i = 0; i < array.length; i++) {
		for (var j = 0,resLen = newArr.length; j < resLen; j++) {
			if (array[i] === newArr[j]) {
				break;
			}
		}
		if (j === resLen) {
			newArr.push(array[i])
		}
	}
	return newArr
}
console.log(unArr(array));