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
  <span class="cart-card__quantity">Qty: 
    <input type="hidden" value="${item.Quantity}">
    <input type="hidden" value="${item.FinalPrice}">
    <input min="1" max="20" id="quantity" class="quantity" name="quantity" type="number" value="${item.Quantity}" required>
    <p class="cart-card__price">$${item.AggregatePrice}</p>
  </span>
  <button class="removeFromCart" data-id=${item.Id}>X</button>
  
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

// Allow user to change cart item quantity
const quantities = document.querySelectorAll(".quantity");
quantities.forEach((quantity) => {
  quantity.onchange = function () {
    var aggregatePrice = quantity.nextElementSibling;
    var initialPrice = quantity.previousElementSibling;
    var initialQuantity = initialPrice.previousElementSibling;

    if (quantity.value > 0 && quantity.value != "") {
      aggregatePrice.textContent =
        "$" + (initialPrice.value * quantity.value).toFixed(2);
    } else {
      quantity.value = initialQuantity.value;
    }
  };

  quantity.onkeyup = function () {
    var aggregatePrice = quantity.nextElementSibling;
    var initialPrice = quantity.previousElementSibling;
    if (quantity.value > 0 && quantity.value != "") {
      aggregatePrice.textContent =
        "$" + (initialPrice.value * quantity.value).toFixed(2);
    }
  };
});
