function Ajax(url){
	var oAjax=null;
	//1.创建ajax对象
	if(window.XMLHttpRequest){
		oAjax=new XMLHttpRequest();
	}else{
		oAjax=new ActiveXObject("Microsoft.XMLHTTP");
	}

	//2.连接服务器
	//open(方法,url,是否异步)
	oAjax.open("GET",url,true)

	//3.发送请求
	oAjax.send();

	//4.接收返回
	oAjax.onreadystatechage=function(){
		if(oAjax.readyState===4){
			if(oAjax.status===200){
				//响应成功
				alert("成功"+oAjax.responseText);
			}else{
				alert("服务器响应失败！");
			}
		}
	}
}