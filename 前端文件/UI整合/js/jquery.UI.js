$(function() {
    function IfChecked(e) {
        var selecter = $(this),
            struc = e.data;
        $(this).bind("change", function() {
            var flag = selecter.prop("checked");
            if (flag) {
                struc.showIcon.addClass('on');
            } else {
                struc.showIcon.removeClass('on');
            }
        });
    }

    $.fn.WZCheckbox = function(options) {
        var settings = $.extend({
        "iconClass":'ui-radio-icon',
        }, options);
        var tag = $(this);
        tag.css({
            'opacity': '0',
            'filter': 'alpha(opacity=0)',
            'width':options.parameter,
            'height':options.parameter,
        });
        var struc = {
            wrap: $("<label>", {
                'class': options.kindClass,
            }),
            showIcon: $("<span>", {
                'class': settings.iconClass,
            }),
            showText: $("<span class=spacing-L5>"+options.addText+"</span>"),
        };
        tag.after(struc.wrap);
        struc.wrap.append(tag);
        struc.wrap.append(struc.showIcon).append(struc.showText);
        tag.bind("PDReload", struc, IfChecked).trigger("PDReload");
    };
});
