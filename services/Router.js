const Router = {
  init: () => {},
  go: (route, addToHistory = true) => {
    console.log("going to: ", route);

    if (addToHistory) {
      history.pushState({ route }, "", route);
    }

    let pageElement = null;
    pageElement = document.createElement("h1");
    switch (route) {
      case "/":
        pageElement.textContent = "Menu";
        break;
      case "/order":
        pageElement.textContent = "Order";
        break;
      default:
        pageElement.textContent = "404 - Page not found ";
        break;
    }

    const main = document.querySelector("main");
    main.innerHTML = "";
    main.appendChild(pageElement);
    window.scrollTo({ left: 0, top: 0 });
  },
};
export default Router;
