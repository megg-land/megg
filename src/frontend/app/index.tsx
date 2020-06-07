import { hot } from "react-hot-loader";
import React, { ReactNode } from "react";
import { isProd } from "../../shared";

class App extends React.Component {
  render(): ReactNode {
    return <div>Hello World!</div>;
  }
}

export default isProd ? App : hot(module)(App);
