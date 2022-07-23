import {
  isEmptyCart,
  cartCount,
  openCartModal,
  removeCartItem,
  addCartItem,
} from "./Cart.js";
import {
  closeImageModalBtn,
  openImageModal,
  zoomImage,
  imageScrollModal,
  imageScrollMobile,
} from "./Images.js";
import {
  overlayOff,
  lightOverlayOff,
  openMobileMenu,
  closeMobileMenuBtn,
} from "./OpenClose.js";

// Menu
const mobileMenu = document.querySelector(".mobile__menu");
// Cart elements
const cart = document.querySelector(".header__cart");
const cartNum = document.querySelector(".cart__num");
const cartModal = document.querySelector(".cart__modal");
const cartFull = document.querySelector(".cart__full");
const cartEmpty = document.querySelector(".cart__empty");
// Buttons
const cartItemDelete = document.querySelector(".item__btn");
const checkoutBtn = document.querySelector(".cart__btn");
const addItem = document.querySelector(".product__btn");
const imageCloseBtn = document.querySelector(".modal__close");
const mobileMenuBtn = document.querySelector(".icon__menu");
const closeMobileBtn = document.querySelector(".close__mobileBtn");
//Images
const prodImage = document.querySelector(".product__image");
const prodBigImage = prodImage.querySelector(".image__big");
const imageModal = document.querySelector(".product__modal");
const modalBigImage = imageModal.querySelector(".image__big");
const controlBtns = document.querySelectorAll(".image__control");
// Counter
const counterControls = document.querySelectorAll(".counter__control");
const counterNum = document.querySelector(".counter__num");
// Overlays
const overlay = document.querySelector(".overlay");
const lightOverlay = document.querySelector(".light-overlay");

// Listeners
window.addEventListener("load", loadCart);
cart.addEventListener("click", () => {
  openCartModal(cartModal, lightOverlay);
});
prodBigImage.children[1].addEventListener("click", () => {
  openImageModal(imageModal, prodBigImage, overlay);
});
imageCloseBtn.addEventListener("click", () => {
  closeImageModalBtn(imageModal, overlay);
});
overlay.addEventListener("click", (e) => {
  overlayOff(e, imageModal);
});
lightOverlay.addEventListener("click", (e) => {
  lightOverlayOff(e, cartModal, mobileMenu);
});
counterControls.forEach((el) => {
  el.addEventListener("click", counterLogic);
});
cartItemDelete.addEventListener("click", (e) => {
  removeCartItem(e, cartEmpty, cartFull, cartNum);
});
addItem.addEventListener("click", (e) => {
  addCartItem(e, cartNum);
});
prodImage.querySelectorAll(".thumb__img").forEach((el) => {
  el.addEventListener("click", (e) => {
    zoomImage(e, prodImage, prodBigImage);
  });
});
imageModal.querySelectorAll(".thumb__img").forEach((el) => {
  el.addEventListener("click", (e) => {
    zoomImage(e, imageModal, modalBigImage);
  });
});
mobileMenuBtn.addEventListener("click", () => {
  openMobileMenu(mobileMenu, lightOverlay);
});
closeMobileBtn.addEventListener("click", () => {
  closeMobileMenuBtn(mobileMenu, lightOverlay);
});
imageModal.querySelectorAll(".image__control").forEach((el) => {
  el.addEventListener("click", (e) => {
    imageScrollModal(e, imageModal);
  });
});
prodImage.querySelectorAll(".image__control").forEach((el) => {
  el.addEventListener("click", (e) => {
    imageScrollMobile(e);
  });
});

// Loading Cart
function loadCart() {
  isEmptyCart(cartEmpty, cartFull);
  cartCount(cartNum);
}

// Product counter
function counterLogic(e) {
  if (e.target.classList.contains("minus")) {
    if (counterNum.innerText > 1) {
      counterNum.innerText = parseInt(counterNum.innerText) - 1;
    }
  } else if (e.target.classList.contains("plus")) {
    counterNum.innerText = parseInt(counterNum.innerText) + 1;
  }
}
