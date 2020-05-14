$(function() {
    $.fn.rollNum = function(options) {
        var settings = $.extend({
            timeout:3000,
            randomNum:106,
            randonSpace:52,
        }, options);
        var tag = $(this);
        tag.each(function(index) {
        	var index_obj=$(this);
            var get_num = index_obj.data("to"); //获取数据
            var get_space = index_obj.data("space"); //获取间距
            var timeout_space = get_num / get_space / settings .timeout; //时间间距
            var sava_num = 0;
            var rollfun = setInterval(function() {
                if (sava_num >= get_num) {
                    index_obj.text(formatNum(get_num));
                    clearInterval(rollfun);
                } else {
                    sava_num +=(get_num/settings.randonSpace);
                    index_obj.text(Math.ceil(sava_num));
                }
            }, timeout_space);
        });
    };
    function formatNum(obj) {
        var d = obj + "";
        var num_rule = new RegExp("^[0-9]+$");
        if (num_rule.test(obj)) {
            var a = d.split("");
            b = a.reverse();
            if (b.length > 3) {
                for (var i = 1; i <= parseInt(a.length / 3); i++) {
                    if (3 * i != b.length) {
                        a[3 * i] += ",";
                    }
                }
                c = b.reverse().join("");
                return c;
            } else {
                return obj;
            }
        }
    }
})
