import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

// Remove from Cart Feature
function itemRemoval() {
  const item = document.getElementsByClassName("removeFromCart");
  item.addEventListener("click", removeFromCart(item.Id));
}

function removeFromCart() {
  const cartItems = (() => {
    const cartItem = localStorage.getItem("so-cart");
    return cartItem === null ? [] : getLocalStorage("so-cart");
  })();
  cartItems.push(this.product);
  setLocalStorage("so-cart", cartItems);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <span class="removeFromCart" data-id=${item.Id}>X</span>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
itemRemoval();
