// 1.判断对象的数据类型
function isType(type,value){
	//  return function(){
	// 	 console.log(type === arguments[0].slice(0,arguments[0].length-1))
	//  }(Object.prototype.toString.call(value).split(" ")[1])

		return console.log('[object '+ type+']' === Object.prototype.toString.call(value)); //注意返回格式 [object Araay],中间是有空格
}

isType("Array",[1,2,3]);
isType("Array",1);

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
var p1=Person_1("Nike",29);
p1.sayName();

//构造函数模式
function Person_2(name,age){
	this.name=name;
	this.age=age;
	this.sayName=function(){
		console.log(this.name)
	}
}
var p2=new Person_2("Nike",29);
p2.sayName();

//构造函数优化
function Person_3(name,age){
	this.name=name;
	this.age=age;
	this.sayName=sayName;
}
function sayName(){
	console.log(this.name)
}
var p3=new Person_3("Nike",29);
p3.sayName();

//原型模式
function Person_4(name,age){};
Person_4.prototype.name="Nike";
Person_4.prototype.sayName=function(){
	console.log(this.name);
};

var p4=new Person_4();
p4.name="New Nike";
p4.sayName();

//组合模式
function Person_5(name,age){
	this.name=name;
	this.age=age;
}
Person_5.prototype={
	constructor: Person_5,
	sayName:function(){
		console.log(this.name);
	}
}
var p5=new Person_5("P5");
p5.sayName();


//动态原型模式
function Person_6(name,age){
	this.name=name;
	this.age=age;
	if(typeof this.sayName != 'function'){
		Person_6.prototype.sayName=function(){
			console.log(this.name);
		}
	}
}
var p6=new Person_6("P6");
p6.sayName();

//寄生构造函数模式 ->同工厂模式一样。区别在于调用时，用new。

//稳妥构造函数模式 ->同工厂模式一样，区别在于不需要声明参数，而是直接接受参数，传入调用处。