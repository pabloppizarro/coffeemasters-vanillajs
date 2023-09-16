const Store = {
  menu: null,
  cart: [],
};

const proxyStore = new Proxy(Store, {
  //target: es al objeto el cual vamos a modificar(en este caso a Store)
  //property: es la key de la propiedad que estamos modificando.
  //value: es el valor de esa key.
  set(target, property, value) {
    target[property] = value;
    if (property == "menu") {
      //Despachamos eventos globales cuando cambia una propiedad,
      //tienen que ser globales para que cualquier DOM o shadowDOM puedan
      //suscribirse
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
