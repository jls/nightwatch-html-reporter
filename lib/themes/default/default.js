$(document).ready(function(){

	$('.suite, .errmessages').click(function(){
		var $elem = $(this);
		$elem.children('.testcases, .errors').slideToggle();
	});

	$('.toggleSuccess').click(function(){
		$('.suite.success').slideToggle();
	});

	$('.toggleError').click(function(){
		$('.suite.error').slideToggle();
	});

});