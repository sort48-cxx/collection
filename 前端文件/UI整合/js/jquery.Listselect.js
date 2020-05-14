$(function() {
	var flag_Click='yes';
	$(".jquery-selcet-ul").delegate("li", "click", function() {
		flag_Click=$(this).data("click");
		if(flag_Click==='yes'){
		var get_Lmoney=$(this).find(".lmoney-val").text();
		$(".jquery-select-text").text(get_Lmoney);
		$(".jquery-select-text").css({color: '#666'});
		}
	});

	$(document).on("click", function() {
		if(flag_Click==='yes'){
		$(".jquery-selcet-ul").hide();
		}
	});
	$(".jquery-select-input").on("click", function(e) {
		e.stopPropagation();
		$(".jquery-selcet-ul").toggle();
	});
	$(".jquery-selcet-ul>li").filter(function(index) {
		if(index%2===0){
			$(this).css("background-color","#fff");
		}else{
			$(this).css("background-color","#f6f6f6");
		}
	});

});
