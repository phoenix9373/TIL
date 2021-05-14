import Breadcrumb from "./Breadcrumb.js";
import Nodes from "./Nodes.js";
import ImageView from "./ImageView.js";
import Loading from "./Loading.js";

import { request } from "./api.js";

export default class App {
  constructor($app) {
    this.$app = $app;

    this.state = {
      routes: ["root"],
      nodes: [],
      filePath: null,
      isRoot: true,
      isLoading: false,
    };

    this.breadcrumb = new Breadcrumb({
      $app,
      initialState: this.state.routes,
    });

    this.nodes = new Nodes({
      $app,
      initialState: {
        nodes: this.state.nodes,
        isRoot: this.state.isRoot,
      },
      onClick: async (node) => {
        try {
          if (node.type === "DIRECTORY") {
            this.setState({
              ...this.state,
              isLoading: true,
            });
            const nextNodes = await request(node.id);
            this.setState({
              ...this.state,
              isLoading: false,
            });
            this.setState({
              ...this.state,
              nodes: nextNodes,
              isRoot: false,
              routes: [...this.state.routes, node.name],
            });
          } else if (node.type === "FILE") {
            // 이미지 렌더링.
            this.setState({
              ...this.state,
              filePath: node.filePath,
            });
          }
        } catch (e) {
          throw new Error(`데이터 요청 에러 발생, Error Message : ${e}`);
        }
      },
    });

    this.loading = new Loading({
      $app,
      initialState: this.state.isLoading,
    });

    this.imageView = new ImageView({
      $app,
      initialState: this.state.filePath,
    });

    this.init();
  }

  setState(nextState) {
    this.state = nextState;
    this.breadcrumb.setState(this.state.routes);
    this.nodes.setState({
      nodes: this.state.nodes,
      isRoot: this.state.isRoot,
    });
    this.imageView.setState(this.state.filePath);
    this.loading.setState(this.state.isLoading);
  }

  async init() {
    this.setState({
      ...this.state,
      isLoading: true,
    });
    const rootNodes = await request();
    this.setState({
      ...this.state,
      nodes: rootNodes,
    });
    console.log(this.state.nodes);
    this.setState({
      ...this.state,
      isLoading: false,
    });
  }
}
