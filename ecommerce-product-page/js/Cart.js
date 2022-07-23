import { lightOverlayOn } from "./OpenClose.js";

// Open/Close Cart
export const openCartModal = (cartModal, lightOverlay) => {
  if (cartModal.classList.contains("hidden")) {
    cartModal.classList.remove("hidden");
    lightOverlayOn(lightOverlay);
  }
};
export const closeCartModal = (cartModal) => {
  if (!cartModal.classList.contains("hidden"))
    cartModal.classList.add("hidden");
};
// Empty or Full cart
export const isEmptyCart = (cartEmpty, cartFull) => {
  const cartList = document.querySelector(".cart__list");

  if (
    cartList.children.length === 0 &&
    cartEmpty.classList.contains("hidden")
  ) {
    cartEmpty.classList.remove("hidden");
    cartFull.classList.add("hidden");
  } else {
    cartEmpty.classList.add("hidden");
    if (cartFull.classList.contains("hidden"))
      cartFull.classList.remove("hidden");
  }
};
// Cart Counter
export const cartCount = (cartNum) => {
  const cartList = document.querySelector(".cart__list");

  let cartCounter = 0;
  const cartItemAmount = document.querySelectorAll(".item__amount");

  if (cartList.children.length !== 0) {
    cartItemAmount.forEach((el) => {
      cartCounter += parseInt(el.innerText);
    });
  }
  cartNum.innerText = cartCounter;
};
// Remove Cart Item
export const removeCartItem = (e, cartEmpty, cartFull, cartNum) => {
  e.target.parentElement.parentElement.remove();
  isEmptyCart(cartEmpty, cartFull);
  cartCount(cartNum);
};
// Add Cart Item
export const addCartItem = (e, cartNum) => {
  const cartList = document.querySelectorAll(".cart__item");
  const productAmount =
    e.target.parentElement.parentElement.querySelector(
      ".counter__num"
    ).innerText;
  const productName =
    e.target.parentElement.parentElement.querySelector(
      ".product__title"
    ).innerText;
  const ans = listContains(cartList, productName);
  if (ans) updateExisting(cartList, productName, productAmount);
  else cartItemContent(e);
  cartCount(cartNum);
};
function listContains(list, title) {
  let ans = false;
  list.forEach((el) => {
    if (el.children[1].children[0].innerText.trim() === title) ans = true;
    else ans = false;
  });
  return ans;
}
function updateExisting(list, title, productAmount) {
  list.forEach((el) => {
    if (el.children[1].children[0].innerText.trim() === title) {
      let price = el.querySelector(".item__price");
      let total = el.querySelector(".item__total");
      let amount = el.querySelector(".item__amount");
      amount.innerText = parseInt(amount.innerText) + parseInt(productAmount);
      const ans =
        parseFloat(price.innerText.substring(1)) * parseInt(amount.innerText);
      total.innerText = "$" + ans.toFixed(2);
    }
  });
}
function cartItemContent(e) {
  const cartList = document.querySelector(".cart__list");
  const productText = e.target.parentElement.parentElement;
  const productImageLink =
    "." +
    productText.parentElement.querySelector(".big-image").src.split("00")[1];
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart__item");
  const itemImg = document.createElement("div");
  itemImg.classList.add("item__img");
  const image = document.createElement("img");
  image.src = productImageLink;
  image.classList.add("img__item");
  itemImg.append(image);
  const itemText = document.createElement("div");
  itemText.classList.add("item__text");
  const itemName = document.createElement("div");
  itemName.classList.add("item__name");
  itemName.innerText = productText.querySelector(".product__title").innerText;
  const itemDesc = document.createElement("div");
  itemDesc.classList.add("item__desc");
  const total =
    parseFloat(
      productText.querySelector(".price__new").innerText.substring(1)
    ) * parseInt(productText.querySelector(".counter__num").innerText);
  itemDesc.innerHTML = `
        <span class="item__price">${
          productText.querySelector(".price__new").innerText
        }</span> x 
        <span class="item__amount">${
          productText.querySelector(".counter__num").innerText
        }</span>
        <span class="item__total">$${total.toFixed(2)}</span>
    `;
  const itemBtn = document.createElement("div");
  itemBtn.classList.add("item__btn");
  itemBtn.innerHTML = `<p><i class="fa-solid fa-trash-can"></i></p>`;

  itemText.append(itemName, itemDesc);
  cartItem.append(itemImg, itemText, itemBtn);
  cartList.append(cartItem);
}
