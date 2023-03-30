import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductsDetails{
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
      }
    async init(){
     // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
     this.product = await this.dataSource.findProductById(this.productId);
     // once we have the product details we can render out the HTML
     this.renderProductDetails("main");
     // once the HTML is rendered we can add a listener to Add to Cart button
     document
       .getElementById("addToCart")
       .addEventListener("click", this.addToCart.bind(this));
   }
    addToCart() {
        let cartItems = (() => {
          let cartItem = localStorage.getItem("so-cart");
          return cartItem === null ? [] : getLocalStorage("so-cart");
        })();
        const cartMatch = cartItems.filter((item) => item.Id == this.productId);
        if (cartMatch.length == 1){
          let quantity = cartMatch[0].Quantity;
          cartMatch[0].Quantity = quantity + 1;
          cartMatch[0].AggregatePrice = (cartMatch[0].Quantity * cartMatch[0].FinalPrice).toFixed(2);
          cartItems = cartItems.filter((item) => item.Id != this.productId);
          cartItems.push(cartMatch[0]);         
        } else {
          this.product.Quantity = 1;
          this.product.AggregatePrice = this.product.Quantity * this.product.FinalPrice;
          cartItems.push(this.product);
        }
        
        setLocalStorage("so-cart", cartItems);
      }    
      
    renderProductDetails(selector){
      const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
    }
}