import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");

loadHeaderFooter();
const category = getParam("category");
const listing = new ProductList(category, dataSource, listElement);
listing.init();
