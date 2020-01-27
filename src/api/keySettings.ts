import axios from "axios";
import { ISettings } from "../models/settings";

const ip = "192.168.7.25:8080";

export const sendKeys = async (keys: string, modifiers?: string) => {
  const mods = modifiers ? `?modifiers=${modifiers}` : "";
  return await axios.get(`http://${ip}/send/keys/${keys}${mods}`);
};

export const getSettings = async () => {
  return await axios.get<ISettings>(`http://${ip}/settings`);
};
