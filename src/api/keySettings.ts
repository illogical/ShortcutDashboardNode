import axios from "axios";
import { ISettings } from "../models/settings";
import { IConfigFile } from "../models/configFile";

// TODO: allow ip and port to be provided via settings
const ip = "192.168.7.25";
const port = "3001";
const getUrl = (path: string) => `http://${ip}:${port}${path}`;

export const sendKeys = async (keys: string, modifiers?: string) => {
  const mods = modifiers ? `?modifiers=${modifiers}` : "";

  return await axios.get(getUrl(`/send/keys/${keys}${mods}`));
};

export const sendCommand = async (command: string) => {
  return await axios.post(getUrl(`/send/command`), { command });
};

export const sendPython = async (command: string) => {
  return await axios.post(getUrl(`/send/python`), { command });
};

export const getSettings = async () => {
  return await axios.get<ISettings>(getUrl(`/settings`));
};

export const saveSettings = async (config: IConfigFile) => {
  return await axios.post<IConfigFile>(getUrl(`/settings`), { config });
};
