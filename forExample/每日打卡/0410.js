//1.Map实际效果
// var arr=[1,2,3]
// console.log(arr.map(item => item*2));  

//[2, 4, 6]

//2.实现Map循环数组的功能

// 循环实现map
/*
const selfMap = function (fn, context) {
	console.log(this);
	let arr = Array.prototype.slice.call(this)
	let mappedArr = Array()
	for (let i = 0; i < arr.length; i++) {
			// 判断稀疏数组的情况
			if (!arr.hasOwnProperty(i)) continue;
			mappedArr[i] = fn.call(context, arr[i], i, this)
	}
	return mappedArr
}

Array.prototype.selfMap=selfMap;
let arr = ['z', 'h', ,'l']
console.log(arr.selfMap(item => item + "1"))
*/


Array.prototype.selfMap = function (fn, content) {
	let arr = Array.prototype.slice.call(this); //this指向调用它的对象
	let newArr = new Array();
	for (let i = 0; i < arr.length; i++) {
		newArr[i] = fn.call(null, arr[i], i); //call(thisArg, arg1, arg2, ...)  如果想传参数，必须放在第二个参数之后，这样调用函数才可以拿到传值。
	}
	return newArr;
}

var a = [1, 2];
var accpetArray = a.selfMap(function (arg) {
	return arg+"1";
});
console.log(accpetArray);

//工厂模式

function Person_1(name,age){
	var p=new Object();
	p.name=name;
	p.age=age;
	p.sayName=function(){
		console.log(this.name);
	}
	return p;
}
var p1=Person_1("NIKE",19);
p1.sayName();

//构造函数模式
function Person_2(name,age){
	this.name=name;
	this.age=age;
	this.sayName=function(){
		console.log(this.name);
	}
}

var p2=new Person_2("P2",15);
p2.sayName();

//构造函数优化模式
function Person_3(name,age){
	this.age=age;
	this.name=name;
	this.sayName=sayName
}
function sayName(){
	console.log(this.name);
}
var p3=new Person_2("P3",15);
p3.sayName();

//原型模式
function Person_4(name,age){}
Person_4.prototype.name="PNI";
Person_4.prototype.sayName=function(){
	console.log(this.name);
}
var p4=new Person_4();
p4.name="P4";
p4.sayName();

//组合模式
function Person_5(name,age){
	this.name=name;
	this.age=age;
}
Person_5.prototype={
	constructor:Person_5,
	sayName:function(){
		console.log(this.name);
	}
}
var p5=new Person_5("P5",16);
p5.sayName();

//动态原型模式
function Person_6(name,age){
	this.age=age;
	this.name=name;
	if(typeof this.sayName !='function'){
		Person_6.prototype.sayName=function(){
			console.log(this.name);
		}
	}
}
var p6=new Person_5("P6",16);
p6.sayName();