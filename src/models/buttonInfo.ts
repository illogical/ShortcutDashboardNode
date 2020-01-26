import { ICommandInfo } from "./commandInfo";

export interface IButtonInfo {
  label: string;
  color?: string; //should groups have colors?
  area: string;
  command: ICommandInfo;
  width?: 1 | 2 | 3;
  icon?: string;
  tags?: string[]; //replace groups?
  app?: string;
}
