//工厂模式
function per1(){
	var o=new Object();
	o.name="p1";
	o.sayname=function(){
		console.log(this.name);
	}
	return o;
}
var p1=per1();
p1.sayname();

//构造函数模式
function per2(name){
	this.name=name;
	this.sayname2=function(){
		console.log(this.name);
	}
}
var p2=new per2("p2");
p2.sayname2();

//构造函数优化模式
function per3(name){
this.name=name;
this.sayname3=sayname3;
}
function sayname3(){
console.log(this.name)
}
var p3=new per3("p3");
p3.sayname3();

//原型模式
function per4(){}
per4.prototype.sayname4=function(){
	console.log(this.name);
}
var p4=new per4();
p4.name="p4";
p4.sayname4();

//动态原型模式
function per5(name){
	this.name=name;
	if(typeof this.sayname5!='function'){
		per5.prototype.sayname5=function(){
			console.log(this.name);
		}
	}
}
var p5=new per5("p5");
p5.sayname5();

//组合模式
function per6(name){
	this.name=name;
}
per6.prototype={
	constructor:per6,
	sayname6:function(){
		console.log(this.name);
	}
}
var p6=new per6("p6");
p6.sayname6();

//寄生模式
function per7(){
	var o=new Object();
	o.name='p7';
	o.sayname7=function(){
		console.log(this.name)
	}
	return o;
}
var p7=new per7();
p7.sayname7();

//稳妥寄生模式
function per8(name){
	var o=new Object();
	o.sayname8=function(){
		console.log(name);
	}
	return o;
}
var p8=new per8("p8");
p8.sayname8();

// 1. 原型链继承
// 2. 借用构造函数继承
// 3. 组合继承
// 4. 原型式继承
// 5. 寄生式继承
// 6. 寄生组合式继承 （借用构造函数+原型链继承）