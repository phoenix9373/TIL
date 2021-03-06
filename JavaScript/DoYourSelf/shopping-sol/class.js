const storage = window.localStorage;

const ITEMS = "items";

class Shopping {
  constructor() {
    this.$items = document.querySelector(".items");

    this.$input = document.querySelector(".footer__input");

    this.$add = document.querySelector(".footer__button");

    this.$items.addEventListener("click", (e) => {
      if (e.target.dataset.id) {
        this.onDelete(e.target.dataset.id);
      }
    });

    this.$add.addEventListener("click", () => {
      this.onSave();
    });

    this.$input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.onSave();
      }
    });
  }

  onSave() {
    const value = this.$input.value;

    if (!value.trim()) {
      return;
    }

    this.setItem(value);

    this.update();

    this.$input.value = "";

    this.$input.focus();

    this.$items.scrollBy({
      top: this.$items.scrollHeight,

      behavior: "smooth",
    });
  }

  onDelete(id) {
    this.removeItem(id);

    this.update();
  }

  update() {
    this.$items.innerHTML = "";

    const fragment = document.createDocumentFragment();

    const items = this.getItems();

    for (let key of Object.keys(items)) {
      fragment.appendChild(this.makeItem(items[key]));
    }

    this.$items.appendChild(fragment);
  }

  makeItem(item) {
    const li = document.createElement("li");

    li.setAttribute("class", "item__row");

    li.innerHTML = `

        <div class="item">

            <span class="item__name">${item.text}</span>

            <button class="item__delete" data-id=${item.id}><i  data-id=${item.id} class="fas fa-trash-alt"></i></button>

        </div>

        <div class="item__divider"></div>

    `;

    return li;
  }

  getItems() {
    const items = storage.getItem(ITEMS);

    return JSON.parse(items);
  }

  setItem(text) {
    const items = this.getItems() || {};

    const id = Date.now().toString();

    items[id] = { id, text };

    storage.setItem(ITEMS, JSON.stringify(items));

    return items;
  }

  removeItem(id) {
    const items = this.getItems();

    delete items[id];

    storage.setItem(ITEMS, JSON.stringify(items));
  }
}

const shopping = new Shopping();

window.addEventListener("DOMContentLoaded", () => {
  shopping.update();
});
