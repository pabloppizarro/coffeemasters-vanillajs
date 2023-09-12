export class MenuPage extends HTMLElement {
  constructor() {
    super();
    //shadow DOM
    this.root = this.attachShadow({ mode: "open" });

    const styles = document.createElement("style");
    this.root.appendChild(styles);

    //IIFE
    (async function () {
      const req = await fetch("/components/MenuPage.css");
      const css = await req.text();
      styles.textContent = css;
    })();
  }
  connectedCallback() {
    //OBTENEMOS LA PLANTILLA A INSTANCIAR
    const template = document.getElementById("menu-page-template");
    const content = template.content.cloneNode(true);
    //Inyectamos el nuevo componente en el DOM
    this.root.appendChild(content);

    window.addEventListener("appmenuchange", () => {
      this.render();
    });
  }
  render() {
    if (app.store.menu) {
      for (let cat of app.store.menu) {
        const liCatElement = document.createElement("li");
        liCatElement.innerHTML = `
            <h3>${cat.name}</h3>
            <ul class='category'>

            </ul>
            `;
        this.root.querySelector("#menu").appendChild(liCatElement);
        cat.products.forEach((p) => {
          const item = document.createElement("product-item");
          item.dataset.product = JSON.stringify(p);
          liCatElement.querySelector("ul").appendChild(item);
        });
      }
    } else {
      this.root.querySelector("#menu").innerHTML = "Loading...";
    }
  }
}

customElements.define("menu-page", MenuPage);
