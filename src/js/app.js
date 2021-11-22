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
    const $header = $('.header');
    const HEADER_SCROLL_CLASS_NAME = 'is-header-fixed';
    const SCROLL_OFFSET = 100;
  
    $btnHamburger.on('click', () => {
      $body.toggleClass(MODAL_OPENED_CLASS_NAME);
      $btnHamburger.toggleClass(BTN_HAMBURGER_ACTIVE_CLASS_NAME);
      $nav.toggleClass(NAVIGATION_ACTIVE_CLASS_NAME);
    });

    $(window).on('scroll', () => {
     const scroll = $(window).scrollTop();
    
      if (scroll >= SCROLL_OFFSET) {
        $header.addClass(HEADER_SCROLL_CLASS_NAME);
      }
      else {
        $header.removeClass(HEADER_SCROLL_CLASS_NAME);
      }
    });
});
