$(function() {
	function InitPubDropdown(e) {
		var selecter = $(this),
			struc = e.data;
		var op = "";
		selecter.find("option").each(function() {
			var Sava_state=$(this).data("state");
			var unclickClass=$(this).attr("class")?'unClick':'';
			if ($(this).prop("value")!=""){
				op += "<li data-value='" + $(this).prop("value") + "' data-state='"+Sava_state+"' class='"+unclickClass+"'>" + $(this).text() + "</li>";
			}
			if($(this).attr("selected")){
				struc.showText.text($(this).text());
				struc.showText.css({color: '#666'});
			}else{
				struc.showText.css({color: '#999'});
			}
		});
		struc.optionUl.html(op);
	}
	$.fn.WZDropdown = function(options) {
		var settings = $.extend({
			height: 38,
			width: 300,
			event: "click"
		}, options);
		var tag = $(this);
		var check_flag='yes';
		$(this).css({
			'opacity': 0,
			'display': 'none',
		});
		var struc = {
			wrap: $("<div>", {
				"class": "pub-deopdown",
				"css": {
					'height': settings.height || target.outerHeight(),
					'width': settings.width || target.outerWidth()
				}
			}),
			optionUl: $("<ul>", {
				"class": "jquery-selcet-ul"
			}),
			showBox: $("<div>", {
				"class": "jquery-select-input"
			}),
			showText: $("<span>", {
				"class": "jquery-select-text"
			}),
			showIcon: $("<span>", {
				"class": "jquery-select-icon"
			}),
		};
		struc.showBox.append(struc.showText).append(struc.showIcon);
		struc.wrap.append(struc.showBox).append(struc.optionUl);
		tag.after(struc.wrap);
		struc.wrap.append(tag);
		struc.showText.text(options.defaultText);
		struc.showBox.on(settings.event, function(e) {
			e.stopPropagation();
			struc.optionUl.toggle();
		});
		$(document).on("click.WZDropdown", function() {
			if(check_flag==='yes'){
				struc.optionUl.hide();
			}
		});
		struc.optionUl.delegate("li", "click", function() {
			check_flag=$(this).data("state");
			if(check_flag==='yes'){
				struc.showText.text($(this).text());
				struc.showText.css({color: '#666'});
			}
		});
		tag.bind("PDReload", struc, InitPubDropdown).trigger("PDReload");
	};
});
