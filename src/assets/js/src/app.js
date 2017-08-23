const initKit = (greeting) => {
  return greeting;
};

console.log(initKit('Init Project'));

$(function() {
  const floatLabel = (e) => {
    var $target = $(e.target);

    if ($target.val() == '') {
      $target.removeClass('flag-filled');
    } else {
      $target.addClass('flag-filled');
    }
  };

  const overlay = (e) => {
    var $target = $(e.target),
    $menu = $('.js-tab-target');

    $target.removeClass('flag-active');
    $menu.removeClass('flag-active');
  };

  $(document)
  .on('click', '.js-overlay', overlay)
  .on('input', '.input', floatLabel);
});
