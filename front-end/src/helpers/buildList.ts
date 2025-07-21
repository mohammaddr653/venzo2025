//this function fills the ul tag to show a list of categories
//if handleDelete and handleUpdate set to null , the buttons wont show
export const buildList = (
  list: any,
  categories: any,
  handleDelete: Function | null,
  handleUpdate: Function | null,
  menu: boolean,
  handleLink: Function | null
) => {
  if (list.current) {
    list.current.innerHTML = "";
    categories.forEach((category: any) => {
      if (category.motherId === "root") {
        listLoop(category, list.current);
      }
    });
  }

  function listLoop(item: any, parent: any) {
    const newLi = document.createElement("li");

    const liHead = document.createElement("div");

    let title;
    let link: string;
    if (menu && handleLink) {
      switch (item.type) {
        case "shop":
          title = document.createElement("a");
          link = `/shop/${item._id}`;
          title.href = link;
          title.onclick = () => {
            handleLink(link);
          };
          break;
        case "archive":
          title = document.createElement("a");
          link = `/archive/${item._id}`;
          title.href = link;
          title.onclick = () => {
            handleLink(link);
          };
          break;
        case "box": //note:need to be completed
          title = document.createElement("h4");
          break;
        case "link":
          title = document.createElement("a");
          link = item.link;
          title.href = link;
          title.onclick = () => {
            handleLink(link);
          };
          break;
        default:
          break;
      }
    } else {
      title = document.createElement("h4");
    }
    if (title) {
      title.innerHTML = menu ? item.name : item.name + `${item.type}`;
      liHead.appendChild(title);
    }

    if (handleDelete && handleUpdate) {
      const liButtons = document.createElement("div");
      liButtons.classList.add("flex", "gap-2");

      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "حذف";
      const updateBtn = document.createElement("button");
      updateBtn.innerText = "ویرایش";
      [deleteBtn, updateBtn].forEach((btn, i) => {
        btn.classList.add("bg-yellow-200");
        liButtons.appendChild(btn);
        btn.onclick = (e, categoryId = item._id) => {
          i == 0 ? handleDelete(categoryId) : null;
          i == 1 ? handleUpdate(categoryId) : null;
        };
      });
      liHead.appendChild(liButtons);
    }

    newLi.appendChild(liHead);
    parent.appendChild(newLi);
    categories.map((category: any) => {
      if (category.motherId === item._id) {
        const newUl = document.createElement("ul");
        newUl.classList.add("ps-5");
        newLi.appendChild(newUl);
        listLoop(category, newUl);
      }
    });
  }
};
