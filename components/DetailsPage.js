// IMPORTANTE AGREGAR EL .JS AL FINAL
import { getProductById } from "../services/Menu.js";
import { addToCart } from "../services/Order.js";

export class DetailsPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const template = document.getElementById("details-page-template");
    const content = template.content.cloneNode(true);
    const styles = document.createElement("style");
    this.root.appendChild(content);
    this.root.appendChild(styles);

    async function loadCSS() {
      const req = await fetch("/components/DetailsPage.css");
      styles.textContent = await req.text();
    }
    loadCSS();
  }

  async renderData() {
    if (this.dataset.productId) {
      this.product = await getProductById(this.dataset.productId);
      this.root.querySelector("h2").textContent = this.product.name;
      this.root.querySelector("img").src = `/data/images/${this.product.image}`;
      this.root.querySelector(".description").textContent =
        this.product.description;
      this.root.querySelector(
        ".price"
      ).textContent = `${this.product.price.toFixed(2)}`;
      this.root.querySelector("button").addEventListener("click", (event) => {
        //TODO ADD THIS CART BY ID
        addToCart(this.product.id);
        app.router.go("/order");
      });
    } else {
      alert("Invalid product id");
    }
  }

  connectedCallback() {
    this.renderData();
  }
}

customElements.define("details-page", DetailsPage);
