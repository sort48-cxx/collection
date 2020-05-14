//工厂模式
function p1(name) {
	var o = new Object();
	o.name = name;
	o.sayname = function () {
		console.log(this.name);
	}
	return o;
}
var pp1 = p1("p1");
pp1.sayname();

//构造函数模式
function p2(name) {
	this.name = name;
	this.sayname2 = function () {
		console.log(this.name);
	}
}
var pp2 = new p2("p2");
pp2.sayname2();

//构造函数优化模式
function p3(name) {
	this.name = name;
	this.sayname3 = sayname3;
}

function sayname3() {
	console.log(this.name);
}
var pp3 = new p3("p3");
pp3.sayname3();

//原型模式
function p4() {}
p4.prototype.sayname4 = function () {
	console.log(this.name)
}
var pp4 = new p4();
pp4.name = "p4";
pp4.sayname4();

//动态原型模式
function p5(name) {
	this.name = name;
	if (typeof this.sayname5 != 'function') {
		p5.prototype.sayname5 = function () {
			console.log(this.name);
		}
	}
}
var pp5 = new p5("p5");
pp5.sayname5();

//组合模式
function p6(name) {
	this.name = name;
}
p6.prototype = {
	constrctor: p6,
	sayname6: function () {
		console.log(this.name);
	}
}
var pp6 = new p6("p6");
pp6.sayname6();

//寄生模式
function p7(name) {
	var o = new Object();
	o.name = name;
	o.sayname7 = function () {
		console.log(this.name)
	}
	return o;
}
var pp7 = new p7("p7");
pp7.sayname7();

//稳妥寄生模式
function p8(name) {
	var o = new Object();
	o.sayname8 = function () {
		console.log(name)
	}
	return o;
}
var pp8 = new p8("p8");
pp8.sayname8();

// 1. 原型链继承
function sup1(){
	this.name="sup1";
}
function sub1(){}

sub1.prototype=new sup1();
var subb1=new sub1();
console.log(subb1.name)

// 2. 借用构造函数继承
function sup2(){
	this.name="sup2";
}
function sub2(){
	sup2.call(this);
}
var subb2=new sub2();
console.log(subb2.name);

// 3. 组合继承
function sup3(){
	this.name="sup3";
}
function sub3(){
	sup3.call(this)
}

sub3.prototype=new sup3();
sub3.constrcutor=sub3;
console.log(sub3.name)

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
console.log(subb4.name)


// 5. 寄生式继承
function sup5(b){
	var o=new Object(b);
	o.name='sup5';
	return o;
}
var sub5={}
var subb5=sup5(sub5);
console.log(subb5.name);
// 6. 寄生组合式继承 （借用构造函数+原型链继承）
function inhre(sub,sup){
	var o=new Object(sup.prototype);
	o.prototype=sub;
	sub.prototype=o;
	return o;
}
function sup6(){
	this.name='sup6';
}
function sub6(){
	sup6.call(this)
}
inhre(sub6,sup6);
var subb6=new sub6();
console.log(subb6.name);