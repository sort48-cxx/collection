// 1. 原型链继承
function sup1() {
	this.name = "P1";
}

function sub1() {}

sub1.prototype = new sup1();
var subb1 = new sub1();
console.log(subb1.name);


// 2. 借用构造函数继承
function sup2(name) {
	this.name = "P2";
}

function sub2() {
	sup2.call(this)
}

var subb2 = new sub2();
console.log(subb2.name);


// 3. 组合继承
function sup3() {
	this.name = "P3";
}

function sub3() {
	sup3.call(this)
}
sup3.prototype = new sup3();
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
	name: 'P4'
}
var p4 = sup4(sub4);
console.log(p4.name);

var p41 = sup4(sub4);
p41.name = "P41"
console.log(p41.name);

// 5. 寄生式继承
function sup5(obj) {
	var o = Object(obj);
	o.name = "P5";
	return o;
}
sub5 = {}
var p5 = sup5(sub5);
console.log(p5.name);

// 6. 寄生组合式继承 （借用构造函数+原型链继承）
function inPro(sub, sup) {
	var p = Object(sup.prototype);
	p.prototype = sub;
	sub.prototype = p;
}

function sup6(name) {
	this.name = "P6";
}

function sub6() {
	sup6.call(this);
}
inPro(sub6, sup6);
var p6 = new sub6(sub6);
console.log(p6.name);



//函数柯里化
// 特点就是 把多个参数函数转化为N个一元函数

/**实际使用 */
function addX(y) {
	return function (x) {
		return console.log(x + y);
	};
}
addX(2)(1);


/**模式实现 */
function selfCurry(fn) {
	console.log(fn.length);
	if (fn.length <= 1) return fn;
	const fun = function (...arg) {
		console.log(...arg);
		if (fn.length === arg.length) {
			return fn(...arg)
		} else {
			return function(...arg1) {
				console.log(...arg1);
				return fun(...arg, ...arg1);
			}
		}
	}
	return fun;
}

function add(x, y,z) {
	console.log(x, y)
	return x + y +z;
}
var cur = selfCurry(add);
cur(2)(12)(6);
console.log(cur(2)(12)(6));
/**参考实现 */
function curry(fn) {
	if (fn.length <= 1) return fn;
	const generator = (...args) => {
		if (fn.length === args.length) {
			//执行fn并且返回执行结果
			return fn(...args)
		} else {
			return (...args2) => {
				//返回generator函数
				return generator(...args, ...args2)
			}
		}
	}
	return generator
}
const display = (a, b, c, d, e, f, g, h) => [a, b, c, d, e, f, g, h];
const curriedDisplay = curry(display);
console.log("curriedDisplay", curriedDisplay(1)(2)(3)(4)(5)(6)(7)(8));