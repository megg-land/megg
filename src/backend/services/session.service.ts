import { session } from "electron";
import { addHours, isBefore } from "date-fns";
import { SessionModel } from "../models/session.model";
import { cookieExpirationTime, cookieName, cookieUrl } from "../../shared/constants";

export async function getSession(): Promise<SessionModel> {
  const cookie = (await session.defaultSession.cookies.get({ url: cookieUrl, name: cookieName }))[0];

  if (!cookie || isBefore(cookie.expirationDate, new Date())) {
    throw new Error("");
  }

  return { secret: cookie.value };
}

export async function setSession(secret: string): Promise<SessionModel> {
  await session.defaultSession.cookies.set({
    url: cookieUrl,
    value: secret,
    name: cookieName,
    httpOnly: true,
    secure: true,
    expirationDate: addHours(new Date(), cookieExpirationTime).getTime(),
  });

  return getSession();
}
