import { ipcMain, IpcMainInvokeEvent } from "electron";
import { ChannelEnum } from "../../shared/enums/channel.enum";
import { createAccount, login, saveCredential } from "./security.service";

ipcMain.handle(ChannelEnum[ChannelEnum.LOGIN], async (event: IpcMainInvokeEvent, ...args: unknown[]) => {
  await login(...args);
});

ipcMain.handle(ChannelEnum[ChannelEnum.CREATE_ACCOUNT], async (event: IpcMainInvokeEvent, ...args: unknown[]) => {
  await createAccount(...args);
});

ipcMain.handle(ChannelEnum[ChannelEnum.SAVE_CREDENTIAL], async (event: IpcMainInvokeEvent, ...args: unknown[]) => {
  await saveCredential(...args);
});
