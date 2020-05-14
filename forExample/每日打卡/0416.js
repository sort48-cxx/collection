//继承

// 1. 原型链继承
function SuperType() {
	this.prototype = true;
}
SuperType.prototype.getSuperValue = function () {
	console.log(this.prototype)
}
function SubType() {
	this.subproperty = false;
}

SubType.prototype = new SuperType();
var sup1=new SuperType();
var sub = new SubType();
sub.prototype="aab";
sub.getSuperValue();
console.log(sup1.prototype)
console.log(sub.subproperty)
console.log("=================")

// 2. 借用构造函数继承
function super2(){
	this.colors=["red","blue"];
}
function sub2(){
	super2.call(this);
}

var i2=new sub2();
console.log(i2.colors);


// 3. 组合继承
function super3(name){
this.name=name;
this.colors=["red","blue"];
}
super3.prototype.sayname=function(){
	console.log(this.name);
}
function sub3(name,age){
	super3.call(this,name);
	this.age=age;
}
sub3.prototype=new super3();
sub3.prototype.constructor=sub3;

var i3=new sub3("P3",18);
i3.sayname();

// 4. 原型式继承
// 5. 寄生式继承
// 6. 寄生组合式继承 （借用构造函数+原型链继承）

// 1. 原型链继承
function nsup1(){
	this.name="nsup1";
}
nsup1.prototype.sayname=function(){
	console.log(this.name);
}
function nsubb1(){}

nsubb1.prototype=new nsup1();
var nsub_1=new nsubb1();
nsub_1.sayname();

// 2. 借用构造函数继承
function nsup2(){
	this.name="nsup2";
}
function nsubb2(){
	nsup2.call(this);
}
var nsub_2=new nsubb2();
console.log(nsub_2.name);

// 3. 组合继承
function nsup3(){
	this.name="nsup3";
}
nsup3.prototype.sayname=function(){
	console.log(this.name);
}
function nsubb3(name,age){
	nsup3.call(this,name);
	this.age=age;
}

nsubb3.prototype=new nsup3();
nsubb3.constructor=nsubb3;
var nsub_3=new nsubb3();
nsub_3.sayname("nsup3");

//实现 ES6 的 class 语法

//其实就是实现子类能够继承父类的属性和方法

function selfClass(sup,sub){
	//寄生虫组合式继承
}