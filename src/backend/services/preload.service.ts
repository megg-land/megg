import { contextBridge, ipcRenderer } from "electron";
import { ChannelEnum } from "../../shared/enums/channel.enum";

function requestIpcRenderer(method: string, channel: ChannelEnum, ...args: unknown[]): Promise<unknown> {
  if (!Object.values(ChannelEnum).includes(channel)) {
    throw new Error("Invalid ipc channel");
  }

  return ipcRenderer.invoke(ChannelEnum[channel], ...args);
}

contextBridge.exposeInMainWorld("api", {
  invoke: (channel: ChannelEnum, ...args: unknown[]) => requestIpcRenderer("invoke", channel, ...args),
});
