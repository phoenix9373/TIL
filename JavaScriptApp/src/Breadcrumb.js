export default class Breadcrumb {
  constructor({ $app, initialState }) {
    this.state = initialState;

    this.$target = document.createElement("nav");
    this.$target.className = "Breadcrumb";

    $app.appendChild(this.$target);

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = this.state
      .map((dirName) => {
        return `<div>${dirName}</div>`;
      })
      .join("");
  }
}
