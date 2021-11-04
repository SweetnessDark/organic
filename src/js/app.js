// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js
// Feel free with using ES6 here.
import $ from 'jquery';

import dots from './modules/dots';

// When DOM is ready
$(() => {
    const $body = $('body');
    const $btnHamburger = $('.btn-hamburger');
    const $nav = $('.nav');
    const MODAL_OPENED_CLASS_NAME = 'is-modal-opened';
    const BTN_HAMBURGER_ACTIVE_CLASS_NAME = 'is-opened';
    const NAVIGATION_ACTIVE_CLASS_NAME = 'is-opened';
  
    $btnHamburger.on('click', () => {
      $body.toggleClass(MODAL_OPENED_CLASS_NAME);
      $btnHamburger.toggleClass(BTN_HAMBURGER_ACTIVE_CLASS_NAME);
      $nav.toggleClass(NAVIGATION_ACTIVE_CLASS_NAME);
    });

    $(window).scroll(function(){
      var header = $('.header'),
          scroll = $(window).scrollTop();
    
      if (scroll >= 100) header.addClass('is-header-fixed');
      else header.removeClass('is-header-fixed');
    });

    $(window).scroll(function(){
      var logo = $('.logo'),
          scroll = $(window).scrollTop();
    
      if (scroll >= 100) logo.addClass('is-logo-fixed');
      else logo.removeClass('is-logo-fixed');
    });
});
