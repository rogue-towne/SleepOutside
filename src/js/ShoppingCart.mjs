import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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
  <input min="1" max="20" id="quantity" class="quantity" name="quantity" data-id=${item.Id} type="number" value="${item.Quantity}" required>
  <p class="cart-card__price">$${item.AggregatePrice}</p>
  <button class="removeFromCart" data-id=${item.Id}>X</button>
</li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.total = 0;
    this.cartList = []
  }
  async init() {
    this.cartList = getLocalStorage(this.key);
    this.calculateListTotal();
    this.renderCartContents();
    document.querySelectorAll(".removeFromCart").forEach((item) => {
      item.addEventListener("click", () =>
        this.removeFromCart(item.getAttribute("data-id"))
      );
    });
    document.querySelectorAll(".quantity").forEach((quantity) => {
      quantity.addEventListener("change", (e) =>
        this.checkQuantityChange(e.target.value, e.target.getAttribute("data-id"))
      );
    });
    //   quantity.onkeyup = function () {
//     if (quantity.value > 0 && quantity.value != "") {
//       aggregatePrice.textContent =
//         "$" + (initialPrice.value * quantity.value).toFixed(2);
//     }
//   };
  }
  checkQuantityChange(quantity, id){
    if (quantity > 0 && quantity != ""){
      this.updateCartItem(quantity, id)
    }
  }
  updateCartItem(quantity, productId){
    let index = this.cartList.findIndex((item) => item.Id == productId);
    this.cartList[index].Quantity = quantity;
    this.cartList[index].AggregatePrice = (this.cartList[index].Quantity * this.cartList[index].FinalPrice).toFixed(2);
    setLocalStorage("so-cart", this.cartList);
    location.reload();
  }
  removeFromCart(productId) {
    const cartItems = getLocalStorage("so-cart");
    let temp = cartItems.filter((item) => item.Id != productId);
    setLocalStorage("so-cart", temp);
    location.reload();
  }
  calculateListTotal() {
    const amounts = this.cartList.map((item) => parseFloat(item.AggregatePrice));
    this.total = amounts.reduce((sum, item) => sum + item);
  }
  renderCartContents() {
    const htmlItems = this.cartList.map((item) => cartItemTemplate(item));
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    document.querySelector(".cart-total").innerText += `Total: $${this.total}`;
  }
}