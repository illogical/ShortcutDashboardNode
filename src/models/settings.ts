import { IKeyMap } from "./keymap";
import { IColorInfo } from "./colorInfo";
import { IGroupInfo } from "./groupInfo";

export interface ISettings {
  keymap: IKeyMap; // TODO: remove this from settings
  colors: IColorInfo;
  applications: string[];
  areas: string[];
  groups: IGroupInfo[];
  filters: string[];
}
