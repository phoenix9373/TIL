const IMAGE_END_POINT =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

export default class ImageView {
  constructor({ $app, initialState }) {
    this.state = initialState;

    this.$target = document.createElement("div");
    this.$target.className = "ImageViewer";

    this.$target.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        this.$target.style.display = "none";
      }
    });
    window.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        this.$target.style.display = "none";
      }
    });

    $app.appendChild(this.$target);

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    if (this.state) {
      this.$target.innerHTML = `
                <div class="content">
                    <img src="${IMAGE_END_POINT}${this.state}">
                </div>
            `;

      this.$target.style.display = this.state ? "flex" : "none";
    }
  }
}
