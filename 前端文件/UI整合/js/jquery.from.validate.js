$(function() {
	// 提示语-成功
	function showSuccess(obj) {
		obj.html("<i class='wzfont validate-success-icon'>&#xe60d;</i>");
	}
	// 提示语-失败
	function showError(obj, text) {
		obj.html("<i class='wzfont validate-error-icon'>&#xe60e;</i><span class='validate-warn-text'>" + text + "</span>");
	}
	// 提示语-消失
	$(".layout-box").delegate("input", "focusin focusout", function(e) {
		if (e.type === "focusin") {
			$(this).parent().next().html("");
		}
	});

	//1.数据为空判断
	$("#isempty_but").click(function() {
		var sava_input = $("#isempty_input").val();
		if ($.trim(sava_input).length == 0) {
			showError($(".validate-warn-empty"), '数据为空');
		} else {
			showSuccess($(".validate-warn-empty"));
		}
	});

	//2.手机号检测
	$("#isphone_but").click(function() {
		var sava_input = $("#isphone_input").val();
		var reg_phone = new RegExp("^1[3-9]{1}[0-9]{9}$");
		if ($.trim(sava_input).length != 0) {
			if (!reg_phone.test(sava_input)) {
				showError($(".validate-warn-phone"), '格式错误');
			} else {
				showSuccess($(".validate-warn-phone"));
			}
		} else {
			showError($(".validate-warn-phone"), '数据为空');
		}
	});

	//3.输入个数检测
	$("#iscount_but").click(function() {
		var sava_input = $("#iscount_input").val();
		var reg_count = new RegExp("^[0-9]{6}$");
		if ($.trim(sava_input).length != 0) {
			if (!reg_count.test(sava_input)) {
				showError($(".validate-warn-count"), '格式错误');
			} else {
				showSuccess($(".validate-warn-count"));
			}
		} else {
			showError($(".validate-warn-count"), '数据为空');
		}
	});

	//4.金额检测
	$("#isamount_but").click(function() {
		var sava_input = $("#isamount_input").val();
		var reg_amount = new RegExp("^(([1-9]{0,9})|0)(\.[0-9]{1,2})?$");
		if ($.trim(sava_input).length != 0) {
			if (!reg_amount.test(sava_input)) {
				showError($(".validate-warn-amount"), '格式错误');
			} else {
				showSuccess($(".validate-warn-amount"));
			}
		} else {
			showError($(".validate-warn-amount"), '数据为空');
		}
	});

	//5.银行卡检测
	$("#isbankcard_but").click(function() {
		var sava_input = $("#isbankcard_input").val();
		var reg_amount = new RegExp("(^[0-9]{16}$)|(^[0-9]{19}$)|(^[0-9]{21}$)");
		if ($.trim(sava_input).length != 0) {
			if (!reg_amount.test(sava_input)) {
				showError($(".validate-warn-bankcard"), '格式错误');
			} else {
				showSuccess($(".validate-warn-bankcard"));
			}
		} else {
			showError($(".validate-warn-bankcard"), '数据为空');
		}
	});

	//6.身份证检测
	$("#isIdcard_but").click(function() {
		var sava_input = $("#isIdcard_input").val();
		var reg_amount = new RegExp("(^[0-9]{15}$)|(^[0-9]{17}([0-9]|X|x)$)");
		if ($.trim(sava_input).length != 0) {
			if (!reg_amount.test(sava_input)) {
				showError($(".validate-warn-Idcard"), '格式错误');
			} else {
				showSuccess($(".validate-warn-Idcard"));
			}
		} else {
			showError($(".validate-warn-Idcard"), '数据为空');
		}
	});

})
