const items = document.querySelector(".items");
const input = document.querySelector(".footer__input");
const addBtn = document.querySelector(".footer__button");
const itemCount = document.querySelector(".item__count");
const removeAllBtn = document.querySelector(".items__remove");

let count = 0;

// 이벤트를 다루는 함수는 on<동작 이름>과 같이 만든다.
// 주석은 함수 단위에서 설명하게 만든다.
function onAdd() {
  const text = input.value;
  if (text === "") {
    input.focus();
    return;
  }
  const item = createItem(text);
  items.appendChild(item);
  item.scrollIntoView({ block: "center" });
  input.value = "";
  input.focus();

  count++;
  itemCount.innerHTML = count;
}

// id는 UUID 등을 활용하는 것이 좋다.
let id = 0;
// 아이템 생성
function createItem(text) {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item__row");
  itemRow.setAttribute("data-id", id);

  itemRow.innerHTML = `
  <div class="item">
    <span class="item__name">${text}</span>
    <button class="item__delete">
      <i class="fas fa-trash-alt" data-id=${id}></i>
    </button>
  </div>
  <div class="item__divider"></div>
  `;

  // 아이디를 증가시킨다.
  id++;

  // const item = document.createElement("div");
  // item.setAttribute("class", "item");

  // const name = document.createElement("span");
  // name.setAttribute("class", "item__name");
  // name.innerHTML = text;

  // const deleteBtn = document.createElement("button");
  // deleteBtn.setAttribute("class", "item__delete");
  // deleteBtn.innerHTML = `<i id="del_${item_id}" class="fas fa-trash-alt"></i>`;
  // Q. 어떻게 itemRow가 방금 만들어진 itemRow임을 알고 삭제할 수 있을까?
  // A. 클로저와 관련이 있다. itemRow를 전달할 때, 위에서 선언한 데이터를
  // "캡쳐"하듯이 전달한다. 따라서 어떤 itemRow인지 명확히 판별 가능하다.
  // deleteBtn.addEventListener("click", () => {
  //   items.removeChild(itemRow);
  //   count--;
  //   itemCount.innerHTML = count;
  // });

  // const date = new Date();
  // const createdDate = document.createElement("span");
  // createdDate.setAttribute("class", "item__date");
  // createdDate.innerHTML = `${date.getFullYear()}. ${date.getMonth()}. ${date.getDate()}.`;

  // const itemDivider = document.createElement("div");
  // itemDivider.setAttribute("class", "item__divider");

  // item.appendChild(name);
  // item.appendChild(deleteBtn);

  // itemRow.appendChild(item);
  // itemRow.appendChild(createdDate);
  // itemRow.appendChild(itemDivider);

  return itemRow;
}

function removeAll() {
  while (items.lastChild) {
    items.removeChild(items.lastChild);
  }
}

addBtn.addEventListener("click", () => {
  onAdd();
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    onAdd();
  }
});

items.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});

removeAllBtn.addEventListener("click", () => {
  removeAll();
});
