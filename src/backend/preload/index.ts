import { Channels } from "../../shared/index";
import { contextBridge, ipcRenderer } from "electron";

function requestIpcRenderer(method: string, channel: Channels, ...args: unknown[]): Promise<unknown> {
  if (!Object.values(Channels).includes(channel)) {
    throw new Error("Invalid ipc channel");
  }

  return ipcRenderer.invoke(Channels[channel], ...args);
}

contextBridge.exposeInMainWorld("api", {
  invoke: (channel: Channels, ...args: unknown[]) => requestIpcRenderer("invoke", channel, ...args),
});
