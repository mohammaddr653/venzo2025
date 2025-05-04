//this function fills the ul tag to show a list of categories
//if handleDelete and handleUpdate set to null , the buttons wont show
export const buildList = (
  list: any,
  categories: any,
  handleDelete: Function | null,
  handleUpdate: Function | null
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
    liHead.classList.add(
      "border",
      "p-2",
      "my-1",
      "flex",
      "justify-between",
      "gap-4"
    );

    const title = document.createElement("h4");
    title.innerHTML = item.name;

    liHead.appendChild(title);
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
