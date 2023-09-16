export class OrderPage extends HTMLElement {
  //JS VANILLA PRIVATE PROPERTY
  #user = {
    name: "",
    phone: "",
    email: "",
  };

  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    const styles = document.createElement("style");
    this.root.appendChild(styles);
    const section = document.createElement("section");
    this.root.appendChild(section);

    async function loadCSS() {
      const req = await fetch("/components/OrderPage.css");
      styles.textContent = await req.text();
    }
    loadCSS();
  }

  connectedCallback() {
    window.addEventListener("appcartchange", () => {
      this.render();
    });
    //PORQUE ESTO ACA? Porque cada vez que conectamos el componente al DOM,
    //Tenemos que hacer que renderize el contenido y UI
    this.render();
  }

  render() {
    let section = this.root.querySelector("section");
    if (app.store.cart.length == 0) {
      section.innerHTML = `
      <h2 class="empty">Your Order is Empty</h2>
      `;
    } else {
      let html = `
      <h2>Your Order</h2>
      <ul>
      </ul>      
      `;
      section.innerHTML = html;

      //OBTENEMOS LA PLANTILLA A INSTANCIAR
      const template = document.getElementById("order-form-template");
      const content = template.content.cloneNode(true);
      //Inyectamos el nuevo componente en el DOM
      section.appendChild(content);

      let total = 0;
      for (const prodInCart of app.store.cart) {
        const item = document.createElement("cart-item");
        item.dataset.item = JSON.stringify(prodInCart);
        this.root.querySelector("ul").appendChild(item);
        total += prodInCart.qty * prodInCart.product.price;
      }

      this.root.querySelector("ul").innerHTML += `
    <li>
    <p class="total">Total</p>
    <p class="price-total">$${total.toFixed(2)}</p>
    </li>
    `;

      this.setFormBindings(this.root.querySelector("form"));
    }
  }

  //Doble Bindeo de formulario.
  setFormBindings(form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      alert(`Thanks for your Order ${this.#user.name}`);
      this.#user.name = "";
      this.#user.phone = "";
      this.#user.email = "";
      //TODO SEND DATA TO SERVER
    });

    this.#user = new Proxy(this.#user, {
      set(target, property, value) {
        target[property] = value;
        form.elements[property].value = value;
        return true;
      },
    });

    Array.from(form.elements).forEach((element) => {
      element.addEventListener("change", (event) => {
        this.#user[element.name] = element.value;
      });
    });
  }
}

customElements.define("order-page", OrderPage);
