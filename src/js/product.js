import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductsDetails from "./ProductDetails.mjs";
loadHeaderFooter();

const dataSource = new ExternalServices();
const productId = getParam("product");

const product = new ProductsDetails(productId, dataSource);
product.init();
