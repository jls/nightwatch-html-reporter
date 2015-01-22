$(document).ready(function(){
	$('.package>.name').click(function(){
		$(this).siblings('.suites').slideToggle();
	});
	$('.group>.name').click(function(){
		$(this).siblings('.packages').slideToggle();
	});
	$('.suite, .errmessages').click(function(){
		var $elem = $(this);
		$elem.children('.testcases, .errors').slideToggle();
	});
	$('.toggleSuccess').click(function(){
		$('.package.success').slideToggle();
	});
	$('.toggleError').click(function(){
		$('.package.error').slideToggle();
	});
});