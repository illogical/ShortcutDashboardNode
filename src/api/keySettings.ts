import axios from 'axios';
import { IConfig } from '../models/config';

// TODO: allow ip and port to be provided via settings
const ip = 'localhost';
const port = '3001';
const getUrl = (path: string) => `http://${ip}:${port}${path}`;

export const sendKeys = async (keys: string, modifiers?: string) => {
    const mods = modifiers ? `?modifiers=${modifiers}` : '';

    return await axios.get(getUrl(`/send/keys/${keys}${mods}`));
};

export const sendCommand = async (command: string) => {
    return await axios.post(getUrl(`/send/command`), { command });
};

export const sendPython = async (command: string) => {
    return await axios.post(getUrl(`/send/python`), { command });
};

export const getConfig = async () => {
    return await axios.get<IConfig>(getUrl(`/config`));
};

export const saveConfig = async (config: IConfig) => {
    return await axios.post<IConfig>(getUrl(`/config`), { config });
};

// export const getSettings = async () => {
//     return await axios.get<IConfig>(getUrl(`/settings`));
// };
