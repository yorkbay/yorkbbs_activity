$(document).ready(function() {
    $(".filter-refine").click(function() {
        $(".filter-more").toggle();
        $(".filter-arrow").toggleClass("filter-close");
        $(".filter-hide").toggle();
        $(".filter-show").toggle();
    });
});

$(document).ready(function() {
    $(".filter-refinea").click(function() {
        $(".filter-more").toggle();
        $(".filter-arrow").toggleClass("filter-close");
        $(".filter-hide").toggle();
        $(".filter-show").toggle();
    });
});

$(document).ready(function() {
    $(".views-drop").click(function() {
        $(".views-drop-cont").toggle();
    });
});

$(document).ready(function() {
    $(".views-item-more").click(function() {
        $(".views-item-summary p").toggle();
    });
});


$(function() {

    $("#ele4").find('.button-printer').on('click', function() {
        $(".print-web").show();
        //Print ele4 with custom options
        $("#ele4").print({
            //Use Global styles
            globalStyles: false,
            //Add link with attrbute media=print
            mediaPrint: false,
            //Custom stylesheet
            stylesheet: "http://fonts.useso.com/css?family=Inconsolata",
            //Print in a hidden iframe
            iframe: false,
            //Don't print this
            noPrintSelector: ".avoid-this",
            //Add this at top
            prepend: "",
            //Add this on bottom
            append: "<br/>Buh Bye!"
        });
        $(".print-web").hide();
    });
});

$(document).ready(function() {

    $(".menu-channels").children("li").mouseenter(function() {
        $(this).find("a:first").addClass("menu-current");
        var menu_content = $(this).find(".menu-content");
        if (0 !== menu_content.length)
        {
            $(this).find(".current-channel").removeClass("swiper-slide-on-01");
            $(this).addClass("is-selected");
            menu_content.show();
        }
    }).mouseleave(function() {
        var menu_content = $(this).find(".menu-content");
        if (0 !== menu_content.length)
        {
            $(this).removeClass("is-selected");
            $(this).find(".current-channel").addClass("swiper-slide-on-01");
            menu_content.hide();
        }
        $(this).find("a:first").removeClass("menu-current");
    });
});

$('[name="nice-select"]').click(function(e) {
    $('[name="nice-select"]').find('ul').hide();
    $(this).find('ul').show();
    e.stopPropagation();
});
$('[name="nice-select"] li').hover(function(e) {
    $(this).toggleClass('on');
    e.stopPropagation();
});
$('[name="nice-select"] li').click(function(e) {
    var val = $(this).text();
    $(this).parents('[name="nice-select"]').find('input').val(val);
    $('[name="nice-select"] ul').hide();
    e.stopPropagation();
});
$(document).click(function() {
    $('[name="nice-select"] ul').hide();
});

$(function(){
    /*审核弹窗*/
    $('.J-review').click(function(){
        $('.J-review-pop').show();
        return false;
    });
    $('.J-review-pop').find('.layer-close').click(function(){
         $('.J-review-pop').hide();
         $('.J-review-pop').find('input[type=text]').val('');
         $('.J-review-pop').find('textarea').val('');
         return false;
    });
    /*排序弹窗*/
    
    $('.J-sort').click(function(){
        $('.J-sort-pop').show();
        return false;
    });
    $('.J-sort-pop').find('.layer-close').click(function(){
         $('.J-sort-pop').hide();
         $('.J-sort-pop').find('input[type=text]').val('');
         $('.J-sort-pop').find('textarea').val('');
         return false;
    });
    /*举报处理*/    
    $('.J-process').click(function(){
        $('.J-report-pop').show();
        return false;
    });
    $('.J-report-pop').find('.layer-close').click(function(){
        $('.J-report-pop').hide();
        $('.J-report-pop').find('input[type=text]').val('');
    
         return false;
    });
    /*添加标签和编辑标签*/
    $('.J-edite-label').click(function(){
        $('.J-label-pop').show();
        return false;
    });
    $('.J-add-label').click(function(){
        $('.J-label-pop').show();
        return false;
    });
    $('.J-label-pop').find('.layer-close').click(function(){
         $('.J-label-pop').hide();
         $('.J-label-pop').find('input[type=text]').val('');
         $('.J-label-pop').find('textarea').val('');
         return false;
    });
    /*权限管理*/
    $('.J-add-admin').click(function(){
        $('.J-authority-pop').show();
        $('.add-authority-pop').show().siblings().hide();
        return false;
    });
    $('.J-authority-pop').find('.layer-close').click(function(){
        $('.J-authority-pop').hide();
        return false;    
    });
    $('.J-change-start').click(function(){
        $('.J-authority-pop').show();
        $('.change-start-pop').show().siblings().hide();
        return false;
    });
    $('.J-change-authority').click(function(){
        $('.J-authority-pop').show();
        $('.change-authority-pop').show().siblings().hide();
        return false;
    });
    /*批量相关   全选*/
	if($('.J-select-all').length>0){
		var onlineSelect = $('.J-select-all').parents('tr').siblings();
		var onlineSelectLg = onlineSelect.length;
		function checkAll(){
			var checkLg = 0;
			onlineSelect.each(function(){
				var  isCheck = $(this).find('td').eq(0).find('input').prop('checked');
				if(isCheck){
					checkLg++;
				}
			});
			return onlineSelectLg == checkLg;
		}
		onlineSelect.each(function(){
			$(this).find('td').eq(0).find('input').click(function(){
				if(checkAll()){
					$('.J-select-all').prop('checked',true);
				}else{
					$('.J-select-all').prop('checked',false);
				}
			});
		});
	}
    $('.J-select-all').click(function(){
        var isAll = $(this).prop('checked');
        if(isAll){
            $(this).parents('tr').siblings().each(function(){
                $(this).find('td').eq(0).find('input').prop('checked',true);
            });
            
        }else{
            $(this).parents('tr').siblings().each(function(){
                $(this).find('td').eq(0).find('input').prop('checked',false);
            });
        }
    });
    /*历史推送*/
    $('.J-history-push').click(function(){
        if($('.J-history-content').is(':hidden')){
            $(this).addClass('currt-show');
            $('.J-history-content').slideDown();
        }else{
            $(this).removeClass('currt-show');
            $('.J-history-content').slideUp();
        }
        return false;
    });

    /*newsletter 预览*/
    $('.J-gener-view').click(function(){
        $('.J-gener-view-pop').show();
        return false;
    });
    $('.J-gener-view-pop').find('.layer-close').click(function(){
         $('.J-gener-view-pop').hide();
         return false;
    });

    /*时间插件*/
    /*
    var start = null;
    var end = null;
    if($('#startdate').length>0){
        start = $('#startdate').val();
        $('#startdate').daterangepicker({
            language: 'zh-CN',
            singleDatePicker: true,
            startDate: start.length>0 ? start : moment().subtract(30, 'days'),
            locale: {
                format: 'YYYY-MM-DD'
            },
        });
    }
    if($('#enddate').length>0){
        end = $('#enddate').val();
        $('#enddate').daterangepicker({
            language: 'zh-CN',
            singleDatePicker: true,
            startDate: end ? end : (start ? start : moment()),
            locale: {
                format: 'YYYY-MM-DD'
            },
        });
    }
    */
    
});