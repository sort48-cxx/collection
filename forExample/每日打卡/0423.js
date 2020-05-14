//工厂模式
function per1(){
	var o=new Object();
	o.name="P1";
	o.sayname=function(){
		console.log(this.name);
	}
	return o;
}
var p1= per1();
p1.sayname();

//构造函数模式
function per2(name){
	this.name=name;
	this.sayname=function(){
		console.log(this.name);
	}
}
var p2= new per2("P2");
p2.sayname();

//构造函数优化模式
function per3(name){
	this.name=name;
	this.sayname=sayname;
}
function sayname(){
	console.log(this.name)
}
var p3= new per3("P3");
p3.sayname();

//原型模式
function per4(){}
per4.prototype.sayname=function(){
	console.log(this.name)
}
var p4= new per4();
p4.name="p4"
p4.sayname();

//动态原型模式
function per5(name){
	this.name=name;
	if(typeof this.sayname!='function'){
		per5.prototype.sayname=function(){
			console.log(this.name);
		}
	}
}
var p5= new per5("p5");
p5.sayname();

//组合模式
function per6(name){
	this.name=name
}
per6.prototype={
	constructor:per6,
	sayname:function(){
		console.log(this.name);
	}
}
var p6= new per6("p6");
p6.sayname();

//寄生模式
function per7(){
	var o=new Object();
	o.name="P7";
	o.sayname=function(){
		console.log(this.name);
	}
	return o;
}
var p7= new per7();
p7.sayname();

//稳妥寄生模式
function per8(name){
	var o=new Object();
	o.sayname=function(){
		console.log(name);
	}
	return o;
}
var p8= new per8("p8");
p8.sayname();

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
	this.name="sup2"
}
function sub2(){
	sup2.call(this)
}
var subb2=new sub2();
console.log(subb2.name)

// 3. 组合继承
function sup3(){
	this.name="sup3";
}
function sub3(){
	sup3.call(this)
}
sub3.prototype=new sup3();
sub3.constructor=sub3
var suub3=new sub3();
console.log(suub3.name);

// 4. 原型式继承
function sup4(o){
	function f(){}
	f.prototype=o;
	return new f();
}

var sub4={name:'sup4'}
var subb4= sup4(sub4);
console.log(subb4.name);

// 5. 寄生式继承
function sup5(sub){
	var o=new Object(sub);
	return o;
}
var sub5={name:'sup5'}
var subb5= sup5(sub5);
console.log(subb5.name);


// 6. 寄生组合式继承 （借用构造函数+原型链继承）
function inher(sub,sup){
	var a=new Object(sup.prototype);
	a.prototype=sub;
	sub.prototype=a;
}

function sup6(){
	this.name='sup6';
}
function sub6(){
	sup6.call(this);
}
inher(sub6,sup6);
var subb6=new sub6();
console.log(subb6.name);