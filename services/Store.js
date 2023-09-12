const Store = {
  menu: null,
  cart: [],
};

const proxyStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;
    if (property === "menu") {
      //Despachamos eventos globales cuando cambia una propiedad
      window.dispatchEvent(new Event("appmenuchange"));
    }
    if (property === "menu") {
      window.dispatchEvent(new Event("app-chart-change"));
    }
  },
});

//Exportamos el handler, no el objeto en si.
export default proxyStore;
