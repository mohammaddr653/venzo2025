//this function manages the listeners of mobile menu items

export const mobileMenuScripts = () => {
  const items = document.querySelectorAll(
    "header div#header-container.mobile-header nav ul li"
  );
  function handler(operation: string, currentChilds: HTMLElement) {
    if (operation === "close") {
      currentChilds?.classList.add("hidden");
    }
    if (operation === "toggle") {
      const children = currentChilds.parentElement?.parentElement?.children; //all li's with same parent
      if (children) {
        for (let li of children) {
          const childs = li.querySelector("div.childs") as HTMLElement | null;
          childs !== currentChilds && childs?.classList.add("hidden");
        }
      }
      currentChilds?.classList.toggle("hidden");
    }
  }

  for (let li of items) {
    const head = li.querySelector("div.head") as HTMLElement | null;
    const childs = li.querySelector("div.childs") as HTMLElement | null;
    if (head && childs) {
      handler("close", childs);
      head.onclick = () => handler("toggle", childs);
    }
  }
};
