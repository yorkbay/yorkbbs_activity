(function(){
	$.fn.showCase = function(optioins){
		return new ShowCase($(this),optioins)
	}
	function ShowCase (dom,option){
		this.scrolCount = 4;
		this.dom = dom;
		this.set = option;	
		this.totalElm = 0;
		this.indent = 0;
		this.calcul();	
		
		
		this.bindEve();
	}
	ShowCase.prototype.calcul = function(){
		this.totalElm =this.dom.find(this.set.scrollDom).find('li').length;
		this.dom.find(this.set.scrollDom).css('width',this.totalElm*25+'%');
		this.dom.find(this.set.scrollDom).find('li').css('width',100/this.totalElm+'%');
		/*this.dom.find(this.set.prv).hide();
		this.dom.find(this.set.next).hide();
		if(this.totalElm>this.scrolCount){
			this.dom.find(this.set.next).show();
		}*/
		this.checkLg();
	}
	ShowCase.prototype.bindEve = function(){
		var _this = this;
		this.dom.find(this.set.prv).click(function(){
			_this.indent -= _this.scrolCount;
			_this.checkLg();
		});
		this.dom.find(this.set.next).click(function(){
			_this.indent += _this.scrolCount;
			_this.checkLg();
		});
	}
	ShowCase.prototype.checkLg = function(){
		if(this.indent<0){
			this.indent = 0;
		}else if(this.indent>this.totalElm-this.scrolCount){
			this.indent = this.totalElm-this.scrolCount
		}
		this.play();
		/*if(this.totalElm>this.scrolCount){
			if(this.indent == 0 ){
				this.dom.find(this.set.prv).hide();
				this.dom.find(this.set.next).show();
			}else if (this.indent ==this.totalElm-this.scrolCount){
				this.dom.find(this.set.next).hide();
				this.dom.find(this.set.prv).show();
			}else{
				this.dom.find(this.set.prv).show();
				this.dom.find(this.set.next).show();
			}
		}*/
	}
	ShowCase.prototype.play = function(){
		this.dom.find(this.set.scrollDom).css('left',-this.indent*25+'%');
	}
})();
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
	$('.J-showcase').showCase({
		scrollDom:'.hot-playlist-content ul',
		prv:'.playlist-prev',
		next:'.palylist-next'
	});

	/*发布页*/
	$('.J-free-check').click(function(){
		if($(this).prop('checked')){
			$('.J-free-or').attr('disabled','disabled');
		}else{
			$('.J-free-or').attr('disabled',false);
		}
	});
	$('.J-online-check').click(function(){
		if($(this).prop('checked')){
			$('.J-online-or').parents().find('.J-online-or').attr('disabled','disabled');
		}else{
			$('.J-online-or').parents().find('.J-online-or').attr('disabled',false);
		}
	});
	$('.J-change-tags a').click(function(){


        var tag=$(this).attr("tag")+",";
        var val=$("#tags").val();
		if($(this).hasClass('release-tags-current')){
			val=val.replace(tag,'');
			$(this).removeClass('release-tags-current');
		}else{
            var current=$(".release-tags-current");
            if(current.length>=2){
                return false;
            }
            val=val+tag;
			$(this).addClass('release-tags-current');
		}
        $("#tags").val(val);

		return false;
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
	/*邮编*/
	var reg = /^[A-Z][0-9][A-Z]\s[0-9][A-Z][0-9]$/;
	$('.J-zip-code').keyup(function(){
		var val = $(this).val();
		var check = reg.test(val);
		if(!check){
			$('.J-zip-code-error').show();
			$(this).addClass('release-hints')
		}else{
			$('.J-zip-code-error').hide();
			$(this).removeClass('release-hints')
		}
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
	$('.J-error-submit').click(function(){
		$('.J-error-layer').show()
		$('.J-error-layer').find('.layer-content').addClass('animate-down-show');
		return false;
	});
	$('.J-error-layer').find('.layer-close').click(function(){
		$('.J-error-layer').hide().find('input').prop('checked',false)
		$('.J-error-layer').find('.layer-content').removeClass('animate-down-show');
		return false;
	});
});
