import axios from "axios";
import { ISettings } from "../models/settings";

const ip = "192.168.7.25";
const port = "3001";
const getUrl = (path: string) => `http://${ip}:${port}${path}`;

export const sendKeys = async (keys: string, modifiers?: string) => {
  const mods = modifiers ? `?modifiers=${modifiers}` : "";

  return await axios.get(getUrl(`/send/keys/${keys}${mods}`));
};

export const getSettings = async () => {
  return await axios.get<ISettings>(getUrl(`/settings`));
};
