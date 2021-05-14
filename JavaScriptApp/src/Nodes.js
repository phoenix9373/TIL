export default class Nodes {
  constructor({ $app, initialState, onClick }) {
    this.state = initialState;
    this.onClick = onClick;

    this.$target = document.createElement("div");
    this.$target.className = "Nodes";

    $app.appendChild(this.$target);

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const nodes = this.state.nodes
      .map((node) => {
        const imgSrc =
          node.type === "DIRECTORY"
            ? "./assets/directory.png"
            : "./assets/file.png";

        return `
              <div class="Node" data-node-id="${node.id}">
                  <img src="${imgSrc}">
                  <div>${node.name}</div>
              </div>
          `;
      })
      .join("");

    const prev = `
          <div class="Node">
              <img src="./assets/prev.png">
          </div>
      `;
    this.$target.innerHTML = this.state.isRoot ? nodes : `${prev}${nodes}`;

    this.$target.querySelectorAll(".Node").forEach(($node) => {
      $node.addEventListener("click", (e) => {
        const { nodeId } = e.currentTarget.dataset;
        const selectedNode = this.state.nodes.find(
          (node) => node.id === nodeId
        );

        if (selectedNode) {
          this.onClick(selectedNode);
        }
      });
    });
  }
}
