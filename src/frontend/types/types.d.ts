import { Channels } from "../../shared/channels";

declare global {
  interface Window {
    api: IpcRendererApi;
  }
}

export interface IpcRendererApi {
  invoke(channel: Channels, ...args: unknown[]): Promise<unknown>;
}
