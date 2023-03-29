
'use strict';

// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function
const modalCloseFunc = function () { modal.classList.add('closed') }

// modal eventListener
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);





// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});





// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  }

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);

}





// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}

//=========== CART================//

const cartIcon = document.querySelector('#btn-add');
const cart = document.querySelector('.cart');
const closeCart = document.querySelector('.cart-close');

cartIcon.addEventListener('click', () => {
  cart.classList.add('active')
})

closeCart.addEventListener('click', () => {
  cart.classList.remove('active')
})

if (document.readyState == "loading") {
  document.addEventListener('DOMContentLoaded', start);
}else {
  start();
}

//================ Start ==================
function start() {
  addevents()
}

//================ Update ==================
function update() {
  addevents()
}

//================ ADD EVENTS ==================
function addevents() {
  let cartRemove_btns = document.querySelectorAll('.cart-remove');
  console.log(cartRemove_btns);
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener('click', handle_removeCartItem)
  })
}

//================ HANDLE EVENTS ==================
function handle_removeCartItem() {
  this.parentElement.remove();
}
