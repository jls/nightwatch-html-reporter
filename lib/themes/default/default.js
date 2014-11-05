$(document).ready(function(){

	$('.suite').click(function(){
		var $elem = $(this);
		$elem.children('.testcases').slideToggle();
	});

	$('.toggleSuccess').click(function(){
		$('.suite.success').slideToggle();
	});

	$('.toggleError').click(function(){
		$('.suite.error').slideToggle();
	});

});