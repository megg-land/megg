import { ipcMain, IpcMainInvokeEvent } from "electron";
import { ChannelEnum } from "../../shared/enums/channel.enum";
import { createAccount, isNewUser, saveCredential, login } from "./security.service";

ipcMain.handle(ChannelEnum[ChannelEnum.LOG_IN], async (event: IpcMainInvokeEvent, ...args: unknown[]) => {
  return login(...args);
});

ipcMain.handle(ChannelEnum[ChannelEnum.CREATE_ACCOUNT], async (event: IpcMainInvokeEvent, ...args: unknown[]) => {
  return createAccount(...args);
});

ipcMain.handle(ChannelEnum[ChannelEnum.SAVE_CREDENTIAL], async (event: IpcMainInvokeEvent, ...args: unknown[]) => {
  return saveCredential(...args);
});

ipcMain.handle(ChannelEnum[ChannelEnum.IS_NEW_USER], async () => {
  return isNewUser();
});
