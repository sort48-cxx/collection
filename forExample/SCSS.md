# SCSS / SASS 
	SASS是CSS预处理语言，SCSS增强了对CSS3的支持，其语法完全兼容CSS3，并且继承了SASS的强大功能。SASS最大的特征是对缩进敏感。

## API
 ·变量声明
	1.声明:`$var`
	2.引用:
	`
		$highlight-color: #F90;

		.selected {
			border: 1px solid $highlight-color;
		}
	`
	3.注意：scss认为中划线和下划线是完全等同：$link-color=$link_color；
	4.全局变量 / 局部变量 
	`
	$width:50px; //全局变量

	.select {
		$height:100px; //局部变量

		width: $width;
		height: $height;
	}
 	`

·嵌套规则
	1.
	`
	#content {
	article {
		h1 { color: #333 }
		p { margin-bottom: 1.4em }
	}
	aside { background-color: #EEE }
	}
	/* 编译后 */
	#content article h1 { color: #333 }
	#content article p { margin-bottom: 1.4em }
	#content aside { background-color: #EEE }
	`

·&:父选择器标识符

	before:
	`
	article a {
	color: blue;
	}
	article a :hover {
	color: red;
	}
	`

	after:
	`
	article a {
	color: blue;
		&:hover { color: red }
	}
	`

·@import [引入一个外部文件]

	1.使用：
	`
	@import "colors";
	@import "mixins";
	@import "grids";
	`

·SCSS 数据类型

	（1）数字，1, 2, 13, 10px。
	（2）字符串，有引号字符串与无引号字符串，"foo", 'bar', baz。
	（3）颜色，blue, #04a3f9, rgba(255,0,0,0.5)。
	（4）布尔型，true, false。
	（5）空值，null。
	（6）数组 (list)，用空格或逗号作分隔符。
	（7）maps, 相当于 JavaScript对象直接量。

·运算符

	（1）字符串连接符
	`
	p {
		cursor: e + -resize;
	}
	`
	（2）算术运算符
	`
	$highlight-color: #F90;
	div {
		font-size: 5px * 2px;
		font-size: 5px + 2em;
		font-size: 16px / 24px; 
	}
	//乘除法的优先级要高于加减法。
	//小括号中的运算具有最高优先级。
	`
	（3）比较运算符
	`
	h2 {
		@if($padding <= 20px) {
			padding: $padding;
		} @else {
			padding: $padding / 2;
		}
	}
	`	
	（4）逻辑运算符
	`
	p {
  		@if ($num>0 and $num<6)  { border: 1px solid;  }
	}
	`
	（5）颜色值运算
	`
	p {
  		color: rgba(255, 0, 0, 0.75) + rgba(0, 255, 0, 0.75);
	}
	`
·指令

	（1）@if()
	`
	p {
		@if 1 + 1 == 2 { border: 1px solid;  }
		@if 5 < 3      { border: 2px dotted; }
		@if null       { border: 3px double; }
	}
	`
	（2）@for()
	`
	@for $i from 1 through 3 {
		.item-#{$i} { width: 2em * $i; }
	}
	//
	.item-1 {width: 2em;}
	.item-2 {width: 4em;}
	.item-3 {width: 6em;}
	`
	（3）@each()
	`
	@each $animal in puma, sea-slug, egret, salamander {
		.#{$animal}-icon {
			background-image: url('/images/#{$animal}.png');
		}
	}
	`
	（4）@while()
	`
	$i: 6;
	@while $i > 0 {
		.item-#{$i} { width: 2em * $i; }
		$i: $i - 2;
	}
	//
	.item-6 {width: 12em; }
	.item-4 {width: 8em; }
	.item-2 {width: 4em; }
	`
	（5）@media()
	`
	.sidebar {
	width: 300px;
		@media screen and (orientation: landscape) {
			width: 500px;
		}
	}
	`
	（6）@at-root()
	`
	.parent{
	color:red;
		@at-root .child {
			width:200px;
			height:50px;
		}
	}
	//
	.parent {
	color: red;
	}
	.child {
	width: 200px;
	height: 50px; 
	}	
	`	
	（7）@content()
	`
	@mixin antzone {
		#head {
			@content;
		}
	}
	@include antzone {
		#logo {
			width:180px;
			height:50px;
		}
	}
	//
	#head #logo {
		width: 180px;
		height: 50px; 
	}
	`	
	（8）without和with
	1.说明：without和with通常和@at-root配合使用；@at-root (without: media)，@at-root (without: support)
	（1）.all：表示所有。
	（2）.rule：表示常规css。
	（3）.media：表示media。
	（4）.support：表示support。
	`
	@media print {
	.parent{
		color:red;
		@at-root (without: media) {
		.child {
			width:200px;
			height:50px;
		} 
		}
	}
	}
	//
	@media print {
	.parent {
		color: red; 
	} 
	}
	.parent .child {
		width: 200px;
		height: 50px; 
	}
	`
·@mixin [混合器可以方便的引用重复使用的css代码]

	`
	@mixin rounded-corners {
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	border-radius: 5px;
	}
	notice {
	background-color: green;
	border: 2px solid #00aa00;
	@include rounded-corners;
	}

	//
	notice {
		background-color: green;
		border: 2px solid #00aa00;
		-moz-border-radius: 5px;
		-webkit-border-radius: 5px;
		border-radius: 5px; 
	}
	`
·@mixin传参 

	`
	@mixin makeradius($radius) {
	border-radius: $radius;
	}
	antTest{
	background-color: blue;
	border: 4px solid #ccc;
	@include makeradius(8px);
	}

	//
	antTest{
	background-color: blue;
	border: 4px solid #ccc;
	border-radius: 8px; 
	}
	`
·@extend
	1.说明：

	@extend继承它后面选择器的样式，但并不是简单的将样式插入继承者中，而是智能的进行了合并。

	@extend通过将继承的选择器，插入到被继承选择器所在的位置，然后在进行一些选择器的合并操作。
	`
	.error {
	border: 1px #f00;
	background-color: #fdd;
	}
	.seriousError {
	@extend .error;
	border-width: 3px;
	}
	//
	.error, .seriousError {
	border: 1px #f00;
	background-color: #fdd; 
	}
	.seriousError {
	border-width: 3px; 
	}
	`
·@%-占位符
	`
	%icon {
		color:red;
		margin: 0 .5em;
	}
	.error-icon {
		@extend %icon;
	}
	.seriousError-icon {
		@extend %icon;
	}
	//
	.error-icon, .seriousError-icon {
		color: red;
		margin: 0 .5em; 
	}
	.error-icon {
	}
	.seriousError-icon {
	}
	`