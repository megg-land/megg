import { ipcMain, IpcMainInvokeEvent } from "electron";
import { ChannelEnum } from "../../shared/enums/channel.enum";
import {
  createAccount,
  isNewUser,
  saveCredential,
  login,
  getAllCredentias,
  deleteCredential,
  setFavorite,
} from "./security.service";
import { AccountCreationModel } from "../models/accountCreation.model";
import { CredentialModel } from "../../shared/models/credential.model";

ipcMain.handle(ChannelEnum[ChannelEnum.LOG_IN], async (event: IpcMainInvokeEvent, password: string) => {
  return login(password);
});

ipcMain.handle(
  ChannelEnum[ChannelEnum.CREATE_ACCOUNT],
  async (event: IpcMainInvokeEvent, accountCreationModel: AccountCreationModel) => {
    return createAccount(accountCreationModel);
  },
);

ipcMain.handle(
  ChannelEnum[ChannelEnum.SAVE_CREDENTIAL],
  async (event: IpcMainInvokeEvent, credential: CredentialModel) => {
    return saveCredential(credential);
  },
);

ipcMain.handle(ChannelEnum[ChannelEnum.DELETE_CREDENTIAL], async (event: IpcMainInvokeEvent, id: string) => {
  return deleteCredential(id);
});

ipcMain.handle(ChannelEnum[ChannelEnum.IS_NEW_USER], async () => {
  return isNewUser();
});

ipcMain.handle(ChannelEnum[ChannelEnum.GET_ALL_CREDENTIALS], async () => {
  return getAllCredentias();
});

ipcMain.handle(ChannelEnum[ChannelEnum.SET_FAVORITE], async (event: IpcMainInvokeEvent, id: string) => {
  return setFavorite(id);
});
