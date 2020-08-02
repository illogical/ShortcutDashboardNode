import { ICommandInfo } from "./commandInfo";

export interface IButtonInfo {
  label: string;
  color?: string; //should groups have colors?
  area: string;
  command: ICommandInfo;
  filter?: string;
  width?: 1 | 2 | 3;
  icon?: string;
  tags?: string[];
  app?: string;
  count?: number;
  size?: "default" | "medium" | "large";
  lastUsed?: Date;
}
