import Store from "./services/Store.js";
import API from "./services/API.js";
import { loadData } from "./services/Menu.js";
import Router from "./services/Router.js";

//Link my Web Components
import { MenuPage } from "./components/MenuPage.js";
import { DetailsPage } from "./components/DetailsPage.js";
import { OrderPage } from "./components/OrderPage.js";
import ProductItem from "./components/ProductItem.js";
// Este evento va a ser disparado cuando el DOM este listo para ser manipulado
var options = {
  once: true,
  passive: true,
};
window.app = {};
app.store = Store;
app.router = Router;
window.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("Hi there");
    loadData();
    Router.init();
  },
  options
);

//CUSTOM EVENTS
window.addEventListener("appcartchange", () => {
  const badge = document.getElementById("badge");
  const totalQty = app.store.cart.reduce((acc, item) => {
    acc += item.qty;
    return acc;
  }, 0);

  badge.textContent = totalQty;
  badge.hidden = totalQty == 0;
});

//AGREGAR LOS SHORTHAND QUE MOSTRO EN EL VIDEO para no repetir codigo
// const $ = (el) => el.querySelector(el).call(this,arguments)
