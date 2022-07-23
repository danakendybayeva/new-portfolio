import { overlayOn } from "./OpenClose.js";

export const openImageModal = (imageModal, prodBigImage, overlay) => {
  const imgSrc = prodBigImage.children[1].src.split("00")[1];
  const index = imgSrc.split("-")[2].split(".")[0];
  const thumbImgs = document
    .querySelector(".modalThumbImages")
    .querySelectorAll(".thumb__img");
  const modalBigImage = document.querySelector(".modalBigImage");
  if (imageModal.classList.contains("hidden")) {
    imageModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    modalBigImage.src = "." + imgSrc;
    thumbImgs.forEach((el) => {
      if (el.classList.contains("current__img"))
        el.classList.remove("current__img");
      if (
        el.children[0].src.split("-")[2] === index &&
        !el.classList.contains("current__img")
      )
        el.classList.add("current__img");
    });
    overlayOn(overlay);
  }
};
export const closeImageModal = (imageModal) => {
  if (!imageModal.classList.contains("hidden")) {
    imageModal.classList.add("hidden");
    document.body.style.overflow = "initial";
  }
};
export const closeImageModalBtn = (imageModal, overlay) => {
  closeImageModal(imageModal);
  if (overlay.classList.contains("active")) overlay.classList.remove("active");
};
export const zoomImage = (e, imageDiv, bigImage) => {
  if (imageDiv.querySelector(".current__img"))
    imageDiv.querySelector(".current__img").classList.remove("current__img");
  const num = e.target.src.split("-")[2];
  let url = `./images/image-product-${num}.jpg`;
  bigImage.children[1].src = url;
  e.target.parentElement.classList.add("current__img");
};
export const imageScrollModal = (e, imageDiv) => {
  const thumbs = imageDiv.querySelectorAll(".thumb__img");

  const imgSrc = "." + e.target.parentElement.children[1].src.split("00")[1];
  const srcs = [
    "./images/image-product-1.jpg",
    "./images/image-product-2.jpg",
    "./images/image-product-3.jpg",
    "./images/image-product-4.jpg",
  ];
  let imgIndex = srcs.indexOf(imgSrc);
  let direction = e.target.classList[1];
  if (direction == "forward") {
    if (imgIndex < srcs.length - 1) imgIndex += 1;
    else imgIndex = 0;
  } else if (direction == "back") {
    if (imgIndex > 0) imgIndex -= 1;
    else imgIndex = srcs.length - 1;
  }
  e.target.parentElement.children[1].src = srcs[imgIndex];
  thumbs.forEach((el) => {
    if (el.classList.contains("current__img"))
      el.classList.remove("current__img");
    if (
      el.children[0].src.split("-")[2] - 1 === imgIndex &&
      !el.classList.contains("current__img")
    )
      el.classList.add("current__img");
  });
};

export const imageScrollMobile = (e) => {
  const imgSrc = "." + e.target.parentElement.children[1].src.split("00")[1];
  const srcs = [
    "./images/image-product-1.jpg",
    "./images/image-product-2.jpg",
    "./images/image-product-3.jpg",
    "./images/image-product-4.jpg",
  ];
  let imgIndex = srcs.indexOf(imgSrc);
  let direction = e.target.classList[1];
  if (direction == "forward") {
    if (imgIndex < srcs.length - 1) imgIndex += 1;
    else imgIndex = 0;
  } else if (direction == "back") {
    if (imgIndex > 0) imgIndex -= 1;
    else imgIndex = srcs.length - 1;
  }
  e.target.parentElement.children[1].src = srcs[imgIndex];
};
