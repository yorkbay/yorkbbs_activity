$(function(){
	

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
		if($(this).hasClass('release-tags-current')){
			$(this).removeClass('release-tags-current');
		}else{
			$(this).addClass('release-tags-current');
		}
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

	

  
});
