//工厂模式
function per1() {
	var o = new Object();
	o.name = "p1";
	o.sayname = function () {
		console.log(this.name)
	}
	return o;
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
var p2 = new per2("p2");
p2.sayname();

//构造函数优化模式
function per3(name) {
	this.name = name;
	this.sayname = sayname;
}

function sayname() {
	console.log(this.name)
}
var p3 = new per3("p3");
p3.sayname();

//原型模式
function per4() {}
per4.prototype.sayname = function () {
	console.log(this.name);
}
var p4 = new per4();
p4.name = "p4";
p4.sayname();

//动态原型模式
function per5(name) {
	this.name = name;
	if (typeof this.sayname != 'function') {
		per5.prototype.sayname = function () {
			console.log(this.name)
		}
	}
}
var p5 = new per5("p5");
p5.sayname();

//组合模式
function per6(name) {
	this.name = name;
}
per6.prototype = {
	constructor: per6,
	sayname: function () {
		console.log(this.name);
	}
}
var p6=new per6("p6");
p6.sayname();

//寄生模式
function per7(){
	var o=new Object();
	o.name="p7";
	o.sayname=function(){
		console.log(this.name)
	}
	return o;
}
var p7=new per7();
p7.sayname();

//稳妥寄生模式
function per8(name){
	var o=new Object();
	o.sayname=function(){
		console.log(name)
	}
	return o;
}
var p8=new per8("p8");
p8.sayname();

// 1. 原型链继承
function sup1(){
	this.name="sup1"
}
function sub1(){}
sub1.prototype=new sup1();
console.log(sub1.name);

// 2. 借用构造函数继承
function sup2(){
	this.name="sup2";
}
function sub2(){
	sup2.call(this);
}
console.log(sub2.name)

// 3. 组合继承
function sup3(){
	this.name="sup3"
}
function sub3(){}
sub3.prototype=new sup3();
sub3.constructor=sub3;
console.log(sub3.name);

// 4. 原型式继承
function sup4(o){
	function f(){}
	f.prototype=o;
	return new f();
}
var sub4={
	name:'sup4'
}
var subb4=sup4(sub4);
console.log(subb4.name);

// 5. 寄生式继承
function sup5(o1){
var o=new Object(o1);
console.log(o);
o.name="sup5";
return o;
}
var sub5={
	age:18
}
var subb5= new sup5(sub5);
console.log(subb5.name,subb5.age)

// 6. 寄生组合式继承 （借用构造函数+原型链继承）
function inhre(sub ,sup){
	var o=new Object(sup.prototype);
	o.age=18;
	o.prototype=sub;
	sub.prototype=o;
	console.log(sub.prototype)
}

function sup6(){
	this.name='supPP';
}
function sub6(){
	sup6.call(this);
}
inhre(sub6,sup6);
var subb6=new sub6();
console.log(subb6.name,subb6.age);
