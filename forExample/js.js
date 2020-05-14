(function(){	// call apply

	Function.prototype.myCall2=function(context){
		context.fn=this;
		var args=[];
		for (let i=1;i<arguments.length;i++){
			args.push('arguments['+i+']');
		}
		eval("context.fn("+args+")");
		delete context.fn;
	}

	Function.prototype.myApply=function(context,arg){
		var content=context||window;
		var args=[];
		var result;
		context.fn=this;
		for (var i=0;i<=arg.length;i++){
			args.push('arg['+i+']');
		}
		
		eval('context.fn('+args+')');
		delete context.fn;
	}



	var person={
		value: 1
	}
	function printyFun(name,age){
		console.log(name,age,this.value); //Tom 29 1
	}

	printyFun.myCall2(person,"Tom","29"); 
	

	
	var animal={
		cat:'white'
	}
	function sayColor(name,color){
		console.log(name+":"+color +" and "+ this.cat); // dog:black and white
	}

	// sayColor.apply(animal,['dog','black']); 
	sayColor.myApply(animal,['dog','black']); 
})()
 