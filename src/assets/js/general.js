window.$ = window.jQuery = require('jquery');

// Plugins
require('slick-carousel');
require('./vendor/slickSettings');

// Vendors
require ('./vendor/loader');
require ('./vendor/expand');
require ('./vendor/popup');
require ('./vendor/formValidation');

require ('./pages/subscribe');

// Init
const initKit = (greeting) => {
  return greeting;
};

console.log(initKit('Init Project'));
