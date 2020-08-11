import { IButtonInfo } from "./buttonInfo";
import { IGroupInfo } from "./groupInfo";
import { IEntity } from "./entity";
import { ISettings } from "./settings";
import { ISystem } from "./system";

export interface IConfig {
  system: ISystem;
  apps: IEntity[];
  areas: string[];
  filters: IEntity[];
  settings: ISettings;
  buttons: IButtonInfo[];
  groups: IGroupInfo[];
}
