import { removeFromCart } from "../services/Order.js";

export default class CarItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    //pasamos datos  de un componente a otro por medio del dataset
    const item = JSON.parse(this.dataset.item);
    this.innerHTML = "";

    //obtengo la referencia a mi html, a mi template
    const template = document.getElementById("cart-item-template");

    //como el template es solo una plantilla, creo la instancia real.
    const content = template.content.cloneNode(true);

    this.appendChild(content);

    //bindeamos
    this.querySelector(".qty").textContent = `${item.qty}x`;
    this.querySelector(".name").textContent = item.product.name;
    this.querySelector(".price").textContent = `$${item.product.price.toFixed(
      2
    )}`;
    this.querySelector("a.delete-button").addEventListener("click", () => {
      removeFromCart(item.product.id);
    });
  }
}

//definimos el elemento custom para que se entienda en el html.
customElements.define("cart-item", CarItem);
