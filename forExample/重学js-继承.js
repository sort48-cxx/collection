/**
 * 重学Js - 继承
 * 20200319
 */

// 1.原型链继承

function SuperType(){
	this.property=true;
}

SuperType.prototype.getSuperValue=function(){
	return this.property;
}

function SubType(){
	this.subproperty=false;
}

SubType.prototype=new SuperType();

SubType.prototype.getSubValue=function(){
	return this.subproperty;
}

var instance = new SubType();
console.log(instance.getSuperValue());

/**
 * 缺点：父类的属性被所有实例共享，实例不能向父类传递参数
 */

/* ====================================================== */

// 2.借用构造函数继承

function SuperType_2(){
	this.colors=['red'];
	this.getColors=function(){
		console.log(this.colors);
	}
}

function SubType_2(){
	SuperType_2.call(this);
}

var instance_2=new SubType_2();
instance_2.colors.push('blue');
console.log(instance_2.colors); // ["red", "blue"]

var instance_2_1=new SubType_2();
console.log(instance_2_1.colors); // ["red"]

/**
 * 优点：避免了引用类型的属性被所有实例共享，可以向父类传递参数
 * 缺点：方法都在构造函数中定义，每一次创建实例都会创建一遍方法
 */

/* ====================================================== */

// 3.组合继承

function SuperType_3(name){
	this.name=name;
	this.colors=["red"];
}

SuperType_3.prototype.sayName=function(){
	console.log(this.name);
}

function SubType_3(name,age){
	SuperType_3.call(this,name);
	this.age=age;
}

SubType_3.prototype=new SuperType_3();
SubType_3.prototype.constructor=SubType_3;
SubType_3.prototype.sayAge=function(){
	console.log(this.age);
}

var instance_3=new SubType_3("Nicholas",29);
instance_3.sayName(); //Nicholas
instance_3.sayAge(); //29

/**
 * 优点：融合原型链继承和使用构造函数继承的优点，最常用的继承模式
 * 缺点：/
 */

/* ====================================================== */

// 4.原型式继承

function CreatObj(o){
	function F(){};
	F.prototype=o;
	return new F();
}

var Person_4={
	name:'a',
	friends:['a']
}

var p1=CreatObj(Person_4);
p1.friends.push('b');

/**
 * 优点：/
 * 缺点：共享了引用类型的属性和方法
 */

/* ====================================================== */

// 5.寄生式继承

function CreatObj_5(o){
	var clone=Object.create(o);
	clone.sayName=function(){
		console.log(this.name);
	}
	return clone;
}
var Person_5={
	name:'a',
	friends:['a']
};
var person_5 = CreatObj_5(Person_5);
person_5.sayName();

/**
 * 优点：/
 * 缺点：每一次创建实例都会创建一遍方法
 */

/* ====================================================== */

// 6.寄生组合式继承

function CreateObj_6(subType,superType){
	var o=Object(superType.prototype);
	o.constructor=subType;
	subType.prototype=o;
}

function SuperType_6(name){
	this.name=name;
}

SuperType_6.prototype.sayName=function(){
	console.log(this.name);
}

function SubType_6(name,age){
	SuperType_6.call(this,name);
	this.age=age;
}

CreateObj_6(SubType_6,SuperType_6);

SubType_6.prototype.sayAge=function(){
	console.log(this.age);
}

var p_6=new SubType_6('kevin', '18');
console.log(p_6)

/**
 * 优点：只调用一次父类的构造函数
 * 缺点：/
 */