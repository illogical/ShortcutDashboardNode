import { ICommandInfo } from "./commandInfo";

export interface IButtonInfo {
  id: number;
  label: string;
  color?: string;
  area?: string; // area is set if group is not
  group?: string; // TODO: remove bc replaced by groupId
  groupId?: number; // TODO: require
  command: ICommandInfo;
  filter?: string;
  width?: 1 | 2 | 3;
  icon?: string;
  tags?: string[]; // TODO: DECIDE- are tags separate from filters for any reason?
  filterIds?: number[]; // TODO: require?
  app?: string; // TODO: remove app bc replaced by appId
  appId?: number; // TODO: require
  count?: number;
  size?: "default" | "medium" | "large";
  lastUsed?: Date;
}
