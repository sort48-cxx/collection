```
function Person(){}

var person1 = new Person(); //创建实例
person1.sayName(); //"Nicholas"
```

**只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个  *prototype*  属性，这个属性指向函数的原型对象。**

在默认情况下，所有原型对象都会自动获得一个  ***constructor*** （构造函数）属性，这个属性包含一个指向 prototype 属性所在函数的指针。Person.prototype. constructor 指向 Person 。

创建了自定义的构造函数之后，其原型对象默认只会取得 constructor 属性；至于其他方法，则都是从 Object 继承而来的。

当调用构造函数  *创建一个新实例*   后，该实例的内部将包含一个指针（内部属性），指向*构造函数的原型对象*。

```
原型对象: __proto__
```

![image-20200324173543924](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200324173543924.png)

 Person.prototype 指向了原型对象，而 Person.prototype.constructor 又指回了 Person 。

 Person 的每个实例——person1 和 person2 都包含一个内部属性，该属性仅仅指向了 Person.prototype ；换句话说，它们与构造函数没有直接的关系。此外，要格外注意的是，虽然这两个实例都不包含属性和方法，但我们却可以调用 person1.sayName() 。这是通过查找对象属性的过程来实现的。

```javascript
isPrototypeOf() 方法来确定对象之间是否存在这种关系。

alert(Person.prototype.isPrototypeOf(person1)); //true
alert(Person.prototype.isPrototypeOf(person2)); //true
```



```javascript
Object.getPrototypeOf() 返回的对象实际，就是这个对象的原型。

alert(Object.getPrototypeOf(person1) == Person.prototype); //true
alert(Object.getPrototypeOf(person1).name); //"Nicholas"
```



```javascript
hasOwnProperty() 方法可以检测一个属性是存在于实例中返回true，还是存在于原型中返回false。

var person1 = new Person();
var person2 = new Person();

alert(person1.hasOwnProperty("name")); //false
person1.name = "Greg";
alert(person1.name); //"Greg"——来自实例
alert(person1.hasOwnProperty("name")); //true

alert(person2.name); //"Nicholas"——来自原型
alert(person2.hasOwnProperty("name")); //false

delete person1.name;
alert(person1.name); //"Nicholas"——来自原型
alert(person1.hasOwnProperty("name")); //false

```

每个函数都有自己的**执行环境**。当执行流进入一个函数时，函数的环境就会被推入一个**环境栈**中。

*而在函数执行之后，环境栈将其环境弹出，把控制权返回给之前的执行环境。*

当某个**函数被调用**时，会**创建一个执行环境**（execution context）及相应的**作用域链**。***作用域链的用途，是***
***保证对执行环境有权访问的所有变量和函数的有序访问。***

每个执行环境都有一个表示变量的对象-“**变量对象**“

如果这个环境是函数，则将其活动对象（activation object）作为变量对象。活动对象在最开始时只包含一个变量，即 arguments 对象（这个对象在全局环境中是不存在的）。即活动对象是由arguments创建的。

使用 ***arguments 和其他命名参数的值来初始化函数的活动对象***（activation object）。但在作用域链中，外部函数的活动对象始终处于第二位，外部函数的外部函数的活动对象处于第三位，……直至作为作用域链终点的全局执行环境。内部环境可以通过作用域链访问所有的外部环境，但外部环境不能访问内部环境中的任何变量和函数。

执行函数时，才修改活动对象里的属性值。**在函数执行过程中，为读取和写入变量的值，就需要在作用域链中查找变量。**

函数执行完毕，该函数执行环境从执行环境栈中弹出。

```javascript
var color = "blue";
function changeColor(){
var anotherColor = "red";
function swapColors(){
var tempColor = anotherColor;
anotherColor = color;
color = tempColor;
// 这里可以访问 color、anotherColor 和 tempColor
}
// 这里可以访问 color 和 anotherColor，但不能访问 tempColor
swapColors();
}
// 这里只能访问 color
changeColor();
```

![](F:\md\images\2020-03-25_102211.jpg)

```javascript
function compare(value1, value2){
if (value1 < value2){
return -1;
} else if (value1 > value2){
return 1;
} else {
return 0;
}
}
var result = compare(5, 10);
```

后台的每个执行环境都有一个表示变量的对象——**变量对象**。全局环境的变量对象始终存在，而像
compare() 函数这样的局部环境的变量对象，则只在函数执行的过程中存在。在***创建 compare() 函数***
***时，会创建一个预先包含全局变量对象的作用域链，这个作用域链被保存在内部的 [[Scope]] 属性中***。

***当调用 compare() 函数时，会为函数创建一个执行环境，然后通过复制函数的 [[Scope]] 属性中的对***
***象构建起执行环境的作用域链。***此后，又有一个活动对象（在此作为变量对象使用）被创建并被推入执
行环境作用域链的前端。对于这个例子中 compare() 函数的执行环境而言，其 *作用域链* 中包含两个变
量对象：*本地活动对象和全局变量对象* 。显然，**作用域链本质上是一个指向变量对象的指针列表，它只**
**引用但不实际包含变量对象。**

无论什么时候在函数中访问一个变量时，就会从作用域链中搜索具有相应名字的变量。一般来讲，
当**函数执行完毕后，局部活动对象就会被销毁，内存中仅保存全局作用域**（全局执行环境的变量对象）。
但是，*闭包的情况又有所不同*。