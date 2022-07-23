import { closeCartModal } from "./Cart.js";
import { closeImageModal } from "./Images.js";

// Show/Hide Overlay
export const overlayOn = (overlay) => {
  if (!overlay.classList.contains("active")) overlay.classList.add("active");
};
export const overlayOff = (e, imageModal) => {
  if (e.target.classList.contains("active"))
    e.target.classList.remove("active");
  closeImageModal(imageModal);
};

// Show/Hide Light Overlay
export const lightOverlayOn = (lightOverlay) => {
  if (!lightOverlay.classList.contains("active"))
    lightOverlay.classList.add("active");
};
export const lightOverlayOff = (e, cartModal, mobileMenu) => {
  if (e.target.classList.contains("active"))
    e.target.classList.remove("active");
  closeCartModal(cartModal);
  closeMobileMenu(mobileMenu);
};

// Open mobile menu
export const openMobileMenu = (mobileMenu, lightOverlay) => {
  if (mobileMenu.classList.contains("hidden")) {
    mobileMenu.classList.remove("hidden");
    lightOverlayOn(lightOverlay);
  }
};
// Close mobile menu
export const closeMobileMenu = (mobileMenu) => {
  if (!mobileMenu.classList.contains("hidden"))
    mobileMenu.classList.add("hidden");
};
// Open mobile menu
export const closeMobileMenuBtn = (mobileMenu, lightOverlay) => {
  if (!mobileMenu.classList.contains("hidden"))
    mobileMenu.classList.add("hidden");
  if (lightOverlay.classList.contains("active"))
    lightOverlay.classList.remove("active");
};
