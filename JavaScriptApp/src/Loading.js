export default class Loading {
  constructor({ $app, initialState }) {
    this.state = initialState;

    this.$target = document.createElement("div");
    this.$target.className = "Loading";

    $app.appendChild(this.$target);

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = `
          <span class="info-text">데이터 요청중...<span>
      `;

    this.$target.style.display = this.state ? "flex" : "none";
  }
}
