
$(function(){



	/*窄屏菜单*/
	$('.topbar-mobile-menu-back').click(function(){
		$('.topbar-mobile-list').toggle();
	});
	$('.J-min-screen-search').click(function(){
		$('.form-search-M').fadeToggle();
	});
	$('.J-newslist-filter').click(function(){
		$('.l-aside').show();
		$('.J-filter-list').show().addClass('animate-slide-to-left');
            $('.layer-mobile').show();
		return false;
	});
	$('.J-filter-shadow').click(function(){
		$('.l-aside').hide();
		$('.J-filter-list').hide().removeClass('animate-slide-to-left');
		return false;
	});
	/*推荐和最新活动切换*/
	$('.newslist-image-caption').find('h2').click(function(){
		var indet = $(this).index();
		$(this).find('a').addClass('newslist-images-current').end().siblings().find('a').removeClass('newslist-images-current');
		$('.newslist-caption-conent').find('ul').eq(indet).show().siblings().hide();
	});
	$('.newslist-image-caption').find('h2').children('a').click(function(e){
		e.preventDefault();
	});

	/*分类搜索*/
	$('.J-page-search').hover(function(){
		$(this).find('.subnav-down').show();
	},function(){
		$(this).find('.subnav-down').hide();
	});

	$('.J-page-search .subnav-down li').click(function(){
		var serVal = $(this).attr('data-val');
		var texts = $(this).text();
		$(this).hide().siblings().show();
		$('.serch-type').text(texts);
		$('#search-area').val(serVal);
	});

	/*newsletters*/
	function checkNesletter(){
		/*if($('.active-newsletter').find('input:checked').length == 0){
			layer.msg('请选择你想订阅的内容',{time:1500});
			return false;
		}*/

		if($.trim($('#newsletter-email').val()).length == 0){
			layer.msg('请输入你的邮箱,订阅最新信息',{time:1500});
			return false;
		}
		return true;
	}
	function getNesletterInfo(){
		var info = {
			type:[],
			email:''
		};
		$('.active-newsletter').find('input:checked').each(function(){
			info.type.push($(this).val());
		});
		info.email = $.trim($('#newsletter-email').val());
		return  info;
	}
	$('#submit-newsletter').click(function(){
		if(checkNesletter()){
			var postData = getNesletterInfo();
			layer.msg('没有配置url，提交暂停');
			return false;
			$.ajax({
				url:'',
				type:'post',
				data:postData,
				success:function(msg){
					layer.msg('感谢您的关注，我们会及时的把最新消息发送到您的邮箱！',{time:1500})
				}
			})
		}
	});


	/*google map*/
	function initialize(lat,lng)
    {
        var mapProp = {
            center:new google.maps.LatLng(lat,lng),
            zoom:10,
            mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        var map=new google.maps.Map(document.getElementById('google-map'), mapProp);
    }
            
           
	$('.J-map').keyup(function(){
		var zone = $('.J-change-zone').val();
		var keyval = $(this).val();
		$.ajax({
			url:'https://maps.googleapis.com/maps/api/geocode/json',
			data:{address:zone+keyval,key:'AIzaSyD0uzSeEzo4VtiYz9nIxFsRN2AWLa6s-vA'},
			success:function(msg){
				if(msg.status == 'OK'){
					var location = msg.results[0].geometry.location;
					initialize(location.lat,location.lng);
				}
				
			}
		});
		$(this).siblings('.release-map-layer').show();
		
		$('body').bind('click',function(e){
			e.stopPropagation();
			$('.release-map-layer').hide();
			$('body').unbind('click');
		});
	});
	
	$('.release-map-layer').click(function(e){
		e.stopPropagation();
	});


	/*分享*/
	$('.J-share').click(function(){
		var shareLink = $(this).attr('href');
		$('.J-share-layer').find('.layer-box-web').val(shareLink).end().show();
		$('.J-share-layer').find('.layer-content').addClass('animate-down-show');
		return false;
	});
	$('.J-share-layer').find('.layer-close').click(function(){
		$('.J-share-layer').find('.layer-content').removeClass('animate-down-show');
		$('.J-share-layer').find('.layer-box-web').val('').end().hide();
		return false;
	});
	/*错误报告*/

	$('.J-error-layer').find('.layer-close').click(function(){
		$('.J-error-layer').hide().find('input').prop('checked',false)
		$('.J-error-layer').find('.layer-content').removeClass('animate-down-show');
		return false;
	});
});
