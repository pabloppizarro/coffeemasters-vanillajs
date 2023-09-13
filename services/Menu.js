import API from "./API.js";

export async function loadData() {
  app.store.menu = await API.fetchMenu();
}

export async function getProductById(id) {
  if (app.store.menu == null) {
    await loadData();
  }
  for (const c of app.store.menu) {
    for (const p of c.products) {
      if (p.id == id) {
        return p;
      }
    }
  }
  return null;
}
