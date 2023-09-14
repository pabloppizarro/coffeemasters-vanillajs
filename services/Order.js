import { getProductById } from "./Menu.js";

//TENEMOS QUE REASIGNAR EL ARRAY PARA QUE FUNCIONE EL PROXI, SI USAMOS
// PUSH POR EJ, NO TRIGGEREA
export async function addToCart(id) {
  const product = await getProductById(id);
  //   console.log("items added=>", app.store.cart);
  const exists = app.store.cart.filter((item) => item.product.id === id);
  if (exists.length) {
    app.store.cart = app.store.cart.map((c) =>
      c.product.id === id ? { ...c, qty: ++c.qty } : c
    );
  } else {
    app.store.cart = [...app.store.cart, { product, qty: 1 }];
  }
}
export function removeFromCart(id) {
  app.store.cart = app.store.cart.filter((c) => c.product.id !== id);
}
