//1.返回符合筛选条件数据的新的数组。
var arr = [1, 2, 3];
var newArr = [];
newArr = arr.filter(function (a, b, c) { //a为数据项，b为下标，c为数据源
	return a > 1;
})
console.log(newArr);


//循环实现数组 filter 方法

Array.prototype.selfFilter = function (fn, content) {
	var selfArr = Array.prototype.slice.call(this);
	var selfNew = [];
	for (var i = 0; i < selfArr.length; i++) {
		if (fn.call(content, selfArr[i], i, this)) {
			selfNew.push(selfArr[i]);
		}
	}
	return selfNew;
}

newArr = arr.selfFilter(function (arg) {
	return arg > 1;
})
console.log(newArr);


// 使用 reduce 实现数组 filter 方法

Array.prototype.selFilter2 = function (fn, content) {
	var selfArr2 = Array.prototype.slice.call(this);
	var newArr2 = [];
	selfArr2.reduce(function (a, b, c) {
		if (fn.call(content, b, c, this)) {
			newArr2.push(b);
		}
	}, 0)
	return newArr2
}

newArr = arr.selFilter2(function (arg) {
	return arg > 1;
});
console.log(newArr);

//some：只有全部为否，则返回false，否则返回true,所以属性最后返回一个布尔值。

var someArr = [1, 2, 3, 4];
console.log(someArr.some(function (a) {
	return a > 5
}));
console.log(someArr.some(function (a) {
	return a > 1
}));

//循环实现数组的 some 方法

Array.prototype.selfSome = function (fn, content) {
	var someArr = Array.prototype.slice.call(this);
	var isFlag = "";
	for (var i = 0; i < someArr.length;) {
		if(fn.call(content, someArr[i], i, this)){
			return true
		}else{
			i++;
		}
	}
	return false;
}

var flag = someArr.selfSome(function (arg) {
	return arg > 3
})
console.log(flag);


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

var p=Person_1("P1",28);
p.sayName();

//构造函数
function Person_2(name,age){
	this.name=name;
	this.age=age;
	this.sayName=function(){
		console.log(this.name);
	}
}

var p2=new Person_2("P2",28);
p2.sayName();

//构造函数优化
function Person_3(name,age){
	this.name=name;
	this.age=age;
	this.sayName=sayName;
}
function sayName(){
	console.log(this.name);
}

var p3=new Person_3("P3",28);
p3.sayName();

//原型模式
function Person_4(name,age){}

Person_4.prototype.name="Nike";
Person_4.prototype.age="15";
Person_4.prototype.sayName=function(){
	console.log(this.name);
};

var p4=new Person_4();
p4.name="P4";
p4.sayName();

//组合模式
function Person_5(name,age){
	this.name=name;
	this.age=age;
}

Person_5.prototype={
	contructor:Person_5,
	sayName:function(){
		console.log(this.name);
	}
}

var p5=new Person_5("p5",15);
p5.sayName();


//动态原型模式
function Person_6(name,age){
	this.name=name;
	this.age=age;
	if(typeof this.sayName!='function'){
		Person_6.prototype.sayName=function(){
			console.log(this.name);
		}
	}
}

var p6=new Person_6("p6",15);
p6.sayName();

//寄生模式
function Person_7(name,age){
	var p=new Object();
	p.name=name;
	p.age=age;
	p.sayName=function(){
		console.log(this.name);
	}
	return p;
}

var p7=new Person_7("P7",28);
p7.sayName();



//稳妥寄生模式
function Person_8(name){
	var p=new Object();
	p.sayName=function(){
		console.log(name);
	}
	return p;
}

var p8=Person_8("P8",28);
p8.sayName();