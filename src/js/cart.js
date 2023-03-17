import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

// Remove from Cart Feature
function removeFromCart(productId) {
  const cartItems = getLocalStorage("so-cart");
  let temp = cartItems.filter((item) => item.Id != productId);
  setLocalStorage("so-cart", temp);
  location.reload();
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
  <button class="removeFromCart" data-id=${item.Id}>X</button>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
// Remove from Cart Feature
document.querySelectorAll(".removeFromCart").forEach((item) => {
  item.addEventListener("click", () =>
    removeFromCart(item.getAttribute("data-id"))
  );
});
