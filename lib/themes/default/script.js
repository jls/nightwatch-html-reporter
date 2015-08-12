$(document).ready(function() {
  $('.package>.name').click(function() {
    $(this).siblings('.suites').slideToggle();
  });

  $('.suites, .errmessages, .testcases').hide();

  $('.suite, .errmessages').click(function() {
    var $elem = $(this);
    $elem.children('.testcases, .errors').slideToggle();
  });
  $('.toggleSuccess').click(function() {
    $('.package.success').slideToggle();
  });
  $('.toggleError').click(function() {
    $('.package.error').slideToggle();
  });
});
