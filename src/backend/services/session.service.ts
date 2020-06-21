import { session } from "electron";
import { addHours, isBefore } from "date-fns";
import { SessionModel } from "../models/session.model";
import { cookieExpirationTime, cookieName, cookieUrl } from "../../shared/constants";

export async function getSession(): Promise<SessionModel> {
  const cookies = await session.defaultSession.cookies.get({ url: cookieUrl, name: cookieName });

  if (!cookies || cookies.length !== 1) {
    // TODO fix this error
    throw new Error("");
  }

  const cookie = cookies[0];

  if (!cookie || isBefore(cookie.expirationDate, new Date())) {
    // TODO fix this error
    throw new Error("");
  }

  return JSON.parse(cookie.value);
}

export async function setSession(sessionModel: SessionModel): Promise<SessionModel> {
  await session.defaultSession.cookies.set({
    url: cookieUrl,
    value: JSON.stringify(sessionModel),
    name: cookieName,
    httpOnly: true,
    secure: true,
    expirationDate: addHours(new Date(), cookieExpirationTime).getTime(),
  });

  return getSession();
}
