import { hot } from "react-hot-loader";
import React, { ReactNode } from "react";
import { Channels, isProd } from "../../shared";
const { api } = window;

async function pingChannel1(): Promise<void> {
  const result = await api.invoke(Channels.CHANNEL1, "Ping channel 1");
  console.log(result);
}

async function pingChannel2(): Promise<void> {
  const result = await api.invoke(Channels.CHANNEL2, "Ping channel 2");
  console.log(result);
}

class App extends React.Component {
  render(): ReactNode {
    return (
      <div>
        <button onClick={pingChannel1}>Ping Channel 1</button>
        <button onClick={pingChannel2}>Ping Channel 1</button>
      </div>
    );
  }
}

export default isProd ? App : hot(module)(App);
