/** call 实际使用  */
function person() {
	console.log(this.name);
}
var a = {
	name: 'Person1',
	age: 18
}

person.call(a);
/** call 实际使用  */


/** call 模拟使用  */
var obj = {
	value: 1
}

function bar(name, age) {
	console.log(arguments);
	return {
		value: this.value,
		name: name,
		age: age
	}
}

Function.prototype.selfCall = function (content) {
	var content = content;
	var arg = [] //接收参数
	content.fn = this;
	for (var i = 0; i < arguments.length; i++) {
		arg.push('arguments[' + i + ']');
	}
	var result = eval('content.fn(' + arg + ')');
	delete content.fn
	return result;
}

console.log(bar.selfCall(obj, 'kevin', 18));
/** call 模拟使用  */

console.log("===============================");

/** apply 实际使用  */
function person(age, graden) {
	console.log(arguments)
	return {
		graden: graden,
		name: this.name,
		age: age
	}
}
var a = {
	name: 'Person1',
}
console.log(person.apply(a, [17, 18]));
/** apply 实际使用  */


/** apply 模拟使用  */
Function.prototype.selfApply = function (context,arg) {
	var context = context;
	context.fn = this;
	var argArr = []
	for (var i = 0; i < (arg.length); i++) {
		// argArr.push(arg[i]);
		argArr.push('arg[' + i + ']');
	}
	console.log(argArr);
	var result = eval('context.fn(' + argArr + ')');
	return result;
}

console.log(person.selfApply(a, [17, 18]));
/** apply 模拟使用  */

/**总结 
 * 
 * 1.call 和 apply 实现的功能是一样的，差别在于调用时传递参数的类型不同，
 * call传递的参数类型只能是单个值传递，
 * apply传递的参数类型只接收数组类型，
 * 
 * 代码实现上的区别也在这个区分上：对参数处理上
 * 1.call直接对接收arguments的值，进行拆分，存放到新的数组中
 * 2.apply要对传入的第二个参数，即为参数数据进行拆分，存放到新的数组中，而不能直接对arguments进行拆分。
 * 
 * 
*/