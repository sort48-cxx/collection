- 事件流描述的是从页面中接收事件的顺序。
- IE 的事件流叫做事件冒泡（event bubbling），即事件开始时由最具体的元素（文档中嵌套层次最深
  的那个节点）接收，然后逐级向上传播到较为不具体的节点（文档）。

![](F:\md\images\微信截图_20200326101447.png)



- 事件捕获的思想是不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件。

  ![](F:\md\images\微信截图_20200326101619.png)

  

- DOM2级事件”规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。首先发生的是事件捕获，为截获事件提供了机会。然后是实际的目标接收到事件。最后一个阶段是冒泡阶段，可以在这个阶段对事件做出响应。

- “DOM2级事件”定义了两个方法，用于处理指定和删除事件处理程序的操作： **addEventListener()**
  和 **removeEventListener()** 。所有 DOM 节点中都包含这两个方法，并且它们都接受 3 个参数：要处
  理的事件名、作为事件处理程序的函数和一个布尔值。最后这个布尔值参数如果是 true ，表示在捕获
  阶段调用事件处理程序；如果是 false ，表示在冒泡阶段调用事件处理程序。



------

- IE事件处理程序

  IE 实现了与 DOM 中类似的两个方法： attachEvent() 和 detachEvent() 。这两个方法接受相同的两个参数：事件处理程序名称与事件处理程序函数。

```js
var btn = document.getElementById("myBtn");
	btn.attachEvent("onclick", function(){
	alert("Clicked");
});
```



- **需记名词**

  > 1.preventDefault() ：取消事件的默认行为 。【IE:returnValue】
  >
  > 2.stopPropagation()：取消事件的进一步捕获或冒泡。 【IE:cancelBubble】

```js
getEvent: function(event){
	return event ? event : window.event;
},
getTarget: function(event){
	return event.target || event.srcElement;
},
preventDefault: function(event){
    if (event.preventDefault){
    	event.preventDefault();
    } else {
    	event.returnValue = false;
    }
},
stopPropagation: function(event){
    if (event.stopPropagation){
    	event.stopPropagation();
    } else {
    	event.cancelBubble = true;
    }
}
```

![](F:\md\images\微信截图_20200326160058.png)