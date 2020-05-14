// new 实现的效果是生成一个实例或者构造函数。
//实际常用的场景是生成一个构造函数的实例，从而实例对象可以访问到构造函数的方法和属性

function Person(name, age) {
	this.name = name;
	this.age = age;
}
Person.prototype.sayname = function () {
	console.log(this.name);
}
Person.prototype.sayage = function () {
	console.log(this.age);
}
var p1 = new Person("PERSON_1", 18);
p1.sayname();
p1.sayage();

console.log("=============================");

//
function objectFactory() {
	var obj = new Object(),
	Constructor = [].shift.call(arguments); //获取对象
	obj.__proto__ = Constructor.prototype;
	var ret = Constructor.apply(obj, arguments);
	return typeof ret === 'object' ? ret : obj;
};

var p2 = objectFactory(Person, 'Kevin', '18');
p2.sayname();
p2.sayage();
console.log("=============================");

//模式实现
function selfNew() {
	var o = new Object();
	var context = Array.prototype.slice.call(arguments, 1); //接收参数
	var fn = Array.prototype.shift.call(arguments, 0, 1); //接收构造函数
	o.__proto__ = fn.prototype; //利用原型链的继承特点实现
	var ret = fn.apply(o, context);
	return typeof ret === 'object' ? ret : o;
}
var p3 = selfNew(Person, 'Kevin', '18');
p3.sayname();
p3.sayage();

console.log("=============================");

// 补漏： 
/**
 * shift:删除第一个元素，并返回该元素的值。
 */
var aArr=["a","b","c"];
var accpet=aArr.shift();
console.log(accpet); // a