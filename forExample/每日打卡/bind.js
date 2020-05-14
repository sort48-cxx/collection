// bind:更换this的指向，不过它无需立即执行，而需函数调用

/**实际使用 */
var obj = {
	name: 'NIKE'
}

function show(y, z) {
	console.log(this.name + y + z);
}

var newbind = show.bind(obj, "hahah");
newbind("bibib");
/**实际使用 */

console.log("=======================")

/**模拟使用 */
Function.prototype.selfBind = function (content) { //返回一个函数出去
	var arg = [];
	var _this = this;
	arg = Array.prototype.slice.call(arguments, 1);
	return function () {
		var bindArgs = Array.prototype.slice.call(arguments);
		_this.apply(content, arg.concat(bindArgs));
	};
}

var selfbind = show.selfBind(obj, "hahah");
selfbind("bibib");
/**模拟使用*/