import { IColorInfo } from "./colorInfo";
import { IGroupInfo } from "./groupInfo";
import { IButtonInfo } from "./buttonInfo";

export interface ISettings {
  colors: IColorInfo;
  applications: string[];
  areas: string[];
  groups: IGroupInfo[];
  filters: string[];
  buttons: IButtonInfo[];
}
