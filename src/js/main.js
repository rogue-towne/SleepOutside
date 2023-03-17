import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductList("Tests", dataSource, listElement);

loadHeaderFooter();

productList.init();
