/**
 * 重学Js -创建对象
 * 20200319
 */

// 1.工厂模式

function Person_1(name, age, job) {

	var create = new Object();
	create.name = name;
	create.age = age;
	create.job = job;

	create.sayName = function () {
		console.log(this.name);
	}
	return create;
}

var p1 = Person_1("Nike", 29, "S");
var p2 = Person_1("Tom", 25, "A");

/**
 * 优点：解决了创建多个相似对象的问题
 * 缺点：无法识别对象的问题，即所有实例指向同一个原型
 */

/* ====================================================== */

// 2.构造函数模式

function Person_2(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = function () {
		console.log(this.name);
	}
}

var person1 = new Person_2("Nicholas", 29, "Software Engineer");
var person2 = new Person_2("Greg", 27, "Doctor");

/**
 * 优点：可以为每个实例创建一个特定的对象类型
 * 缺点：创建实例每个方法都要创建一遍
 */

/* ====================================================== */

// 3.构造函数模式优化

function Person_3(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = sayName;
}

function sayName() { //定义全局函数
	console.log(this.name)
}

var person1 = new Person_2("Nicholas", 29, "Software Engineer");
var person2 = new Person_2("Greg", 27, "Doctor");

/**
 * 优点：解决了两个函数做同一件事的问题
 * 缺点：在全局作用域中定义的函数实际上只能被某个对象调用，如果对象需要定义很多方法，
 *       那么就要定义很多个全局函数，于是我们这个自定义的引用类型就丝毫没有封装性可言了。
 */

/* ====================================================== */

// 4.原型模式

function Person_4() {}

Person_4.prototype.name = "Nicholas";
Person_4.prototype.age = 29;
Person_4.prototype.job = "B";
Person_4.prototype.sayName = function () {
	console.log(this.name);
}

//字面量重写
Person_4.prototype = {
	constructor: Person_4,
	name: "A",
	age: 29,
	job: "B"
}

var person1 = new Person();
person1.name = "A";
person1.sayName(); //A
var person2 = new Person();
person2.name = "B";
person2.sayName(); //B

/**
 * 优点：可以让所有对象实例共享它所包含的属性和方法
 * 缺点：不能初始化参数
 */

/* ====================================================== */

// 5.组合模式（构造函数模式+原型模式）

function Person_5(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
}
Person_5.prototype = {
	constructor: Person_5,
	sayName: function () {
		console.log(this.name);
	}
}

var person1 = new Person();
person1.name = "A";
person1.sayName(); //A
var person2 = new Person();
person2.name = "B";
person2.sayName(); //B

/**
 * 优点：该共享的共享，该私有的私有，使用最广泛的方法
 * 缺点：如何整合一起，加强封装性
 */

/* ====================================================== */

// 6.动态原型模式

function Person_6(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	if (typeof this.sayName != 'function') { //可以通过检查某个应该存在的方法是否有效，来决定是否需要初始化原型
		Person_6.prototype.sayName = function () {
			console.log(this.name);
		}
	}
}
var friend = new Person_6("Nicholas", 29, "Software Engineer");
friend.sayName();

/**
 * 优点：保持了同时使用构造函数和原型的优点
 * 缺点：/
 */

/* ====================================================== */

// 7.寄生构造函数模式

function Person_7(name, age, job) {
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function () {
		alert(this.name);
	};
	return o;
}

var friend = new Person_7("Nicholas", 29, "Software Engineer");
friend.sayName(); //"Nicholas"

/**
 * 优点：/
 * 缺点：/
 */

/* ====================================================== */

// 8.稳妥构造函数模式

function Person_8(name) {
	var o = new Object();

	o.sayName = function () {
		alert(name);
	};
	return o;
}

var friend = Person_8("Nicholas");
friend.sayName(); //"Nicholas"

/**
 * 优点：没有公共属性，而且其方法也不引用 this 的对象
 * 缺点：无法识别对象所属类型
 */