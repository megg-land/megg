import { ipcMain, IpcMainInvokeEvent } from "electron";
import { Channels } from "../../../shared/channels";

ipcMain.handle(Channels[Channels.CHANNEL1], (event: IpcMainInvokeEvent, ...args: unknown[]) => {
  console.log(args);
  return "Pong channel 1";
});
