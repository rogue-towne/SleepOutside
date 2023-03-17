import { loadHeaderFooter } from "./utils.mjs";
import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductsDetails from "./ProductDetails.mjs";
loadHeaderFooter();

const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductsDetails(productId, dataSource);
product.init();
