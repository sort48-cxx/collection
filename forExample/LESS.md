# SCSS / SASS 
	Less是一种动态样式语言，属于css预处理器的范畴，它扩展了CSS语言，增加了变量、Mixin、函数等特性，使CSS更易维护和扩展。Less 既可以在客户端上运行，也可以借助Node.js在服务端运行。


## API

	· 注释
		· 以//开头的注释，不会被编译到css文件中
		· 以/**/包裹的注释会被编译到css文件中

	· 变量
		使用 @ 来申明一个变量：@accentColor：pink;

		·变量用法

			· 选择器
			`
			@selector: h2;

			@{selector} {
				background: #2ECCFA;
			}
			`
			· URL
			`
			@images: "http://www.xxxx.cn";

			.myclass {
				background : url("@{images}/less/images/less_variables/birds.jpg");
				width:800px;
				height:500px;
			}
			`
			· Import语句
			`
			@path : "//www.xxxx.cn/less";
			@import "@{path}/external1.less";
			.myclass{
				color : #A52A2A;
			}
			`
			· 变量插值属性
			`
			@my-property: color;
			.myclass {
				background-@{my-property}: #81F7D8;
			}
			`
			· 变量名称
			`
			.myclass{
				@col: #ca428b;
				@color: "col";
				background-color: @@color;
			}
			`
			· 变量延迟加载
			`
			p {
			font-size: @a;
			color: #ca428b;
			}
			@a: @b;
			@b: 25px;
			`
			· 默认变量

	· 嵌套规则
	`
	#a {
	.b {
		&:hover {
		width:30px
		}
	}
	}

	//
	#a .b:hover {
		width: 30px;
	}
	`
	· 混合（mixin）[混合就是将一系列属性从一个规则集引入到另一个规则集的方式]

		· 不输出Mixin
		`
		.a(){
			padding-left: 100px;	
		}
		.myclass{
			background : #64d9c0;
			.a;
		}
		//
		.myclass {
			background: #64d9c0;
			padding-left: 100px;
		}			
		`
		.Mixins中的选择器
		`
		.mixin() {
			&:hover {
				background: #FFC0CB;
			}
		}
		a {
			.mixin();
		}

		//

		a:hover {
		background: #FFC0CB;
		}			
		`		
		.Mixin命名空间
		`
		#outer() {
		background:yellow;
		.inner {
			color: red;
		}
		}
		p {
		#outer > .inner;
		}
		
		//

		p {
			color: red;
		}			
		`
		.保护的命名空间
		`
		#namespace when (@color = blue) {
			.mixin() {
				color: red;
			}
		}
		p{
			#namespace .mixin();
		}
		
		//
		p {
			color: red;
		}			
		`
		.！important关键字 
		`
		.mixin(){
		color: #900;
		background: #F7BE81;
		}
		.para1{
		.mixin();
		}
		.para2{
		.mixin() !important;
		}

		//
		.para1 {
			color: #900;
			background: #F7BE81;
		}
		.para2 {
			color: #900 !important;
			background: #F7BE81 !important;
		}
		`	
		·Mixins具有多个参数
		`
		.mixin(@color) {
			color: @color;
		}
		.mixin(@color; @padding: 2) {
			color: @color;
			padding: @padding;
		}

		.myclass {
			.mixin(#FE9A2E);
		}
		//
		.myclass {
			color: #FE9A2E;
			padding: 2;
		}
		`
		·命名参数
		`
		.mixin(@color: black; @fontSize: 10px) {
		color: @color;
		font-size: @fontSize;
		}
		.class1 {
		.mixin(@fontSize: 20px; @color: #F5A9D0);
		}
		.class2 {
		.mixin(#F79F81; @fontSize: 20px);
		}
		//
		.class1 {
			color: #F5A9D0;
			font-size: 20px;
		}
		.class2 {
			color: #F79F81;
			font-size: 20px;
		}		
		`
		·@arguments variable
		`
		.box-shadow(@x: 0; @y: 0; @height: 3px; @width: 3px) {
		-webkit-box-shadow: @arguments;
			-moz-box-shadow: @arguments;
				box-shadow: @arguments;
		}
		.myclass {
		.box-shadow(2px; 2px);
		}

		//
		.myclass {
		-webkit-box-shadow: 2px 2px 3px 3px;
		-moz-box-shadow: 2px 2px 3px 3px;
		box-shadow: 2px 2px 3px 3px;
		}	
		`
		·高级参数和@rest Variable
		`
		.mixin(...) {        // it matches arguments from 0-n
		.mixin() {           // it matches exactly 0 arguments
		.mixin(@x: 1) {      // it matches arguments from 0-1
		.mixin(@x: 1; ...) { // it matches arguments from 0-n
		.mixin(@x; ...) {

		//

		.mixin(@x; @rest...) {
		// @arguments is bound to all arguments
		}

		`
		·模式匹配
		`
		.mixin(dark; @color) {
			color: darken(@color, 15%);
		}
		.mixin(light; @color) {
			color: lighten(@color, 15%);
		}

		@color-new: dark;
		.myclass {
			.mixin(@color-new; #FF0000);
		}
		//

		.myclass {
			color: #b30000;
		}

		`
	·操作 [算术运算符]
	`
	@fontSize: 10px;
	.myclass {
		font-size: @fontSize * 2;
		color:green;
	}
	//
	.myclass {
		font-size: 20px;
		color: green;
	}
	`
	·导入
	@import "style"; 

	·循环
	`
	.cont(@count) when (@count > 0) {
		.cont((@count - 1));
		width: (25px * @count);
	}
	div {
		.cont(2);
	}

	//
	div {
		width: 25px;
		width: 50px;
	}	
	`