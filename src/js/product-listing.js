import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductList from "./ProductList.mjs";
import ExternalServices from "./ExternalServices.mjs";

const dataSource = new ExternalServices();
const listElement = document.querySelector(".product-list");

loadHeaderFooter();
const category = getParam("category");
const listing = new ProductList(category, dataSource, listElement);
listing.init();
