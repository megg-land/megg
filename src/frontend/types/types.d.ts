import { ChannelEnum } from "../../shared/enums/channel.enum";

declare global {
  interface Window {
    api: IpcRendererApi;
  }
}

export interface IpcRendererApi {
  invoke(channel: ChannelEnum, ...args: unknown[]): Promise<unknown>;
}
