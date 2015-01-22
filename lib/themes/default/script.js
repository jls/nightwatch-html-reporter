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

	var lvl1 = true;
	var lvl1Selector = '.packages'
	$('.toggleLvl1').click(function(){
		if (lvl1) {
			lvl1 = false;
			$(lvl1Selector).show();
		} else {
			lvl1 = true;
			$(lvl1Selector).hide();
		}
	});

	var lvl2 = true;
	var lvl2Selector = '.suites';
	$('.toggleLvl2').click(function(){
		if (lvl2) {
			lvl2 = false;
			$(lvl2Selector).show();
		} else {
			lvl2 = true;
			$(lvl2Selector).hide();
		}
	});

	var lvl3 = true;
	var lvl3Selector = '.testcases, .errors'
	$('.toggleLvl3').click(function(){
		if (lvl3) {
			lvl3 = false;
			$(lvl3Selector).show();
		} else {
			lvl3 = true;
			$(lvl3Selector).hide();
		}
	});
});