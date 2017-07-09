var initKit = function(greeting) {
  return greeting;
};

console.log(initKit('Init Starter Kit'));

$(function() {

  function floatLabel(e) {
    var $target = $(e.target);

      if ($target.val() == '') {
          $target.removeClass('flag-filled');
      } else {
          $target.addClass('flag-filled');
      }
  }

  function overlay(e) {
    var $target = $(e.target),
        $menu = $('.js-tab-target');

    $target.removeClass('flag-active');
    $menu.removeClass('flag-active');
  };

  // Actions
  $(document)
    .on('click', '.js-overlay', overlay)
    .on('input', '.input', floatLabel);

});
