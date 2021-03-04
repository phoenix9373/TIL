const list = document.querySelector(".list");
const form = document.querySelector("form");
const input = document.querySelector(".input");

let list_id = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let newItem = addItem(input.value, list_id);

  list.append(newItem);

  ++list_id;

  input.value = "";
  input.focus();
});

list.addEventListener(
  "click",
  (e) => {
    if (e.target.className.includes("fa-trash")) {
      let remove_id = e.path[1].id;
      let remove_li = document.querySelector(`#${remove_id}`);
      remove_li.remove();
    }
  },
  { capture: true }
);

function addItem(value, id) {
  const item = document.createElement("li");
  const name = document.createElement("span");
  const icon = document.createElement("i");

  name.innerText = value;
  icon.setAttribute("class", "fas fa-trash");
  item.setAttribute("class", "item");
  item.setAttribute("id", `list_${id}`);
  item.append(name, icon);

  return item;
}

// Event Bubbling Test
const frame = document.querySelector(".frame");

frame.addEventListener(
  "click",
  (e) => {
    console.log(e.currentTarget.className);
  },
  { capture: true }
);

list.addEventListener("click", (e) => {
  console.log(e.currentTarget.className);
});

const items = [];

items.forEach((item) => {
  item.addEventListener(
    "click",
    (e) => {
      console.log(e.currentTarget.className);
    },
    { capture: true }
  );
});
