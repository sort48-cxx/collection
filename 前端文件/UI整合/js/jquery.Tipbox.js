$(function() {
    jQuery.extend({
        success_box: function(text) {
            $("body").append("<div class='page-wrapper'><div class='public-tip-box public-bg-success'><div class='clearfix'><div class='public-tip-icon success-icon left'></div><div class='public-tip-ml10 left lightblack'><span class='font-16 color-333 public-tip-mr10'>成功！</span>" + text + "</div><div class='public-tip-close right color-98c700'><a>x</a></div></div></div></div>");
            //setScroll($(".public-tip-box"));
            //setTimeout(function() { $(".public-tip-box").fadeOut().remove(); }, 2000);
        },
        error_box: function(text) {
           $("body").append("<div class='page-wrapper'><div class='public-tip-box public-bg-error'><div class='clearfix'><div class='public-tip-icon error-icon left'></div><div class='public-tip-ml10 left lightblack'><span class='font-16 color-333 public-tip-mr10'>错误！</span>" + text + "</div><div class='public-tip-close right color-eb5439'><a>x</a></div></div></div></div>");
            //setScroll($(".public-tip-box"));
            //setTimeout(function() { $(".public-tip-box").fadeOut().remove(); }, 2000);
        },
        warn_box: function(text) {
            $("body").append("<div class='page-wrapper'><div class='public-tip-box public-bg-warn'><div class='clearfix'><div class='public-tip-icon warn-icon left'></div><div class='public-tip-ml10 left lightblack'><span class='font-16 color-333 public-tip-mr10'>警告！</span>" + text + "</div><div class='public-tip-close right color-fab418'><a>x</a></div></div></div></div>");
            //setScroll($(".public-tip-box"));
            //setTimeout(function() { $(".public-tip-box").fadeOut().remove(); }, 2000);
        }
    })
    //定位
    function setScroll(obj) {
        var sava_obj = obj;
        var w_s = $(window).scrollTop();
        if (w_s > 137) {
            sava_obj.css({ 'position': 'fixed', 'top': '0px' });
        } else {
            sava_obj.css({ 'position': 'absolute', 'top': '137px' });
        }
    }
    //关闭弹窗
    $(document).on("click", ".public-tip-close>a", function() {
        $(".public-tip-box").remove();
    });
})