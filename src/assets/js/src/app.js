var initKit = function(greeting) {
  return greeting;
};

console.log(initKit('Init Starter Kit'));

$(function() {

  $(document)
    .on('click', '.js-overlay', hideOverlay());

  function hideOverlay() {
    var $this = $(this),
        $menu = $('.js-tab-target');

    $this.removeClass('flag-active');
    $menu.removeClass('flag-active');
  }

});
