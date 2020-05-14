//工厂模式
//构造函数模式
//构造函数优化模式
//原型模式
//动态原型模式
//组合模式
//寄生模式
//稳妥寄生模式

// 1. 原型链继承
// 2. 借用构造函数继承
// 3. 组合继承
// 4. 原型式继承
// 5. 寄生式继承
// 6. 寄生组合式继承 （借用构造函数+原型链继承）

//工厂模式
function per1(name) {
	var o = new Object();
	o.name = "P1";
	o.sayname = function () {
		console.log(this.name);
	}
	return o;
}
var p1 = per1();
p1.sayname();

//构造函数模式
function per2(name) {
	this.name = name;
	this.sayname = function () {
		console.log(this.name);
	}
}
var p2 = new per2("P2");
p2.sayname();

//构造函数优化模式
function per3(name) {
	this.name = name;
	this.sayname = sayname;
}

function sayname() {
	console.log(this.name)
}
var per3 = new per3("P3");
per3.sayname();

//原型模式
function per4() {}
per4.prototype.sayname = function () {
	console.log(this.name)
}
var p4 = new per4();
p4.name = "p4";
p4.sayname();

//组合模式
function per5(name) {
	this.name = name;
}
per5.prototype = {
	constructor: per5,
	sayname: function () {
		console.log(this.name)
	}
}
var p5 = new per5("P5");
p5.sayname();

//动态原型模式
function per6(name) {
	this.name = name;
	if (typeof this.sayname != 'function') {
		per6.prototype.sayname = function () {
			console.log(this.name)
		}
	}
}

var p6 = new per6("P6");
p6.sayname();

//寄生模式
function per7(name) {
	var o = new Object();
	o.name = "P7",
		o.sayname = function () {
			console.log(this.name);
		}
	return o;
}
var p7 = new per7();
p7.sayname();

//稳妥寄生模式
function per8(name) {
	var o = new Object();
	o.sayname = function () {
		console.log(name);
	}
	return o;
}
var p8 = new per8("P8");
p8.sayname();

// 1. 原型链继承
function sup1() {
	this.name = 'sup1';
}

function sub1() {}
sub1.prototype = new sup1()
var subb1 = new sub1();
console.log(subb1.name);

// 2. 借用构造函数继承
function sup2() {
	this.name = "SUP2";
}

function sub2() {
	sup2.call(this)
}
var subb2 = new sub2();
console.log(subb2.name);

// 3. 组合继承

function sup3() {
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
function sup5(o) {
	function f() {}
	f.prototype = o;
	return new f();
}
var sub5 = {
	name: 'sup5'
}
var subb5 = sup5(sub5);
console.log(subb5.name)

// 5. 寄生式继承
function sup4(o) {
	var o = new Object();
	o.name = "sup4";
	o.sayname = function () {
		console.log(this.name)
	}
	return o;
}

var sub4 = {}
var sbb4 = sup4(sub4);
console.log(sbb4.name);

/**
 * 防抖
 * 任务频繁触发的情况下，只有任务触发的间隔超过指定间隔的时候，任务才会执行。
 */
window.onload = function () {
	var btn1 = document.getElementById("btn1");
	btn1.addEventListener("click", debounce(fn));

	var btn2 = document.getElementById("btn2");
	btn2.addEventListener("click", throttle(fn));

}

function debounce(fn) {
	var timer = null;
	return function () {
		clearTimeout(timer)
		timer = setTimeout(function () {
			fn.call(this)
		}, 2000)
	}
};

function throttle(fn) {
	console.log("222")
	let flag = true;
	return function () {
		if (!flag) {
			return
		};
		flag = false;
		setTimeout(function () {
			fn.call(this)
			flag = true;
		}, 1000)
	}
}

function fn() {
	console.log("防抖生效~")
}