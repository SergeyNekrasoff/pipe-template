window.$ = window.jQuery = require('jquery');

// Plugins
require('slick-carousel');

// Vendors
require ('./vendor/loader');
require ('./vendor/expand');
require ('./vendor/popup');
require ('./vendor/sticky');
require ('./vendor/formValidation');

require ('./pages/subscribe');

// Init
const initKit = (greeting) => {
  return greeting;
};

console.log(initKit('Init Project'));
