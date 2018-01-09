$(function() {
	'use strict';

	$('.brands-tracker').slick({
    dots: false,
    infinite: true,
    speed: 360,
    cssEase: 'linear',
    slidesToShow: 5,
  	slidesToScroll: 1,
    autoplay: false,
		arrows: true,
  });

	$('.tracker').slick({
    dots: true,
		autoplay: true,
		autoplaySpeed: 3500,
    infinite: true,
    speed: 460,
    slidesToShow: 1,
    slidesToScroll: 1,
		arrows: false,
		responsive: [
			{
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
					arrows: false
        }
      }
    ]
	});
});
