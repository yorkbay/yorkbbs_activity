$(document).ready(function() {
    $('.nav-list-lit p').click(function(){
		$('.nav-list-lit').find('.nav-sublist').slideUp(300);
		$(this).siblings('.nav-sublist').slideDown(300);
		$('.nav-list-lit p').removeClass('current');
		$(this).addClass('current');
	});
});

$(function() {
    $(".table-star").click(function() {
        $(this).toggleClass("table-star-current");
    });
});