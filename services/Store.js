const Store = {
  menu: null,
  cart: [],
};

const proxyStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;
    if (property == "menu") {
      //Despachamos eventos globales cuando cambia una propiedad
      window.dispatchEvent(new Event("appmenuchange"));
    }
    if (property == "cart") {
      window.dispatchEvent(new Event("appcartchange"));
    }
    return true;
  },
});

//Exportamos el handler, no el objeto en si.
export default proxyStore;
