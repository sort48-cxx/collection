var arr=[1,2,3];
var newArr=[];
arr.reduce(function(a,b,c){ //a:执行自定义函数的结果，b为下一项，c为元素的下标
	return newArr.push(b+"a");
},[])
console.log(newArr);

//回顾：split  slice

var spArr="a,b,c";  //字符串分割
console.log(spArr.split(","));

var slArr="ABCD"; //字符串截取
console.log(slArr.slice(0,2));


Array.prototype.selfMap=function(fn,content){

	//map最终是返回一个新的数组
	var arr=Array.prototype.slice.call(this);
	var newArr=[];
	arr.reduce(function(newv,next,index){
		 newArr.push(fn.call(content,next,index,this));
	},0)
	return newArr;
}

var selfArr=arr.selfMap(function(arg){
	return arg+"a";
})
console.log(selfArr);