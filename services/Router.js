const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const url = e.target.getAttribute("href");
        Router.go(url);
      });
    });
    //Event handler browser URL navigation
    window.addEventListener("popstate", (e) => {
      Router.go(e.state.route, false);
    });

    //check the initial URL
    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    console.log("going to: ", route);

    if (addToHistory) {
      history.pushState({ route }, "", route);
    }

    let pageElement = null;
    switch (route) {
      case "/":
        pageElement = document.createElement("menu-page");
        break;
      case "/order":
        pageElement = document.createElement("order-page");
        break;
      default:
        if (route.startsWith("/product-")) {
          pageElement = document.createElement("detail-page");
          const paramId = route.substring();
        } else {
          pageElement.textContent = "404 - Page not found ";
        }
        break;
    }

    const main = document.querySelector("main");
    main.innerHTML = "";
    main.appendChild(pageElement);
    window.scrollTo({ left: 0, top: 0 });
  },
};
export default Router;

//IDEAS PARA MEJORAR EL ROUTER:
// AGREGAR PARAMETROS PARA RUTAS DINAMICAS EN BASE A REGEX
// AGREGAR ARRAY DE RUTAS
// PASAR POR PARAMETRO EL COMPONENTE/PAGINA A RENDERIZAR
