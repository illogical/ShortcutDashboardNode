import { IButtonInfo } from "./buttonInfo";
import { IGroupInfo } from "./groupInfo";
import { IEntity } from "./entity";
import { ISettings } from "./settings";
import { ISystem } from "./system";

// TODO: Decide ISettings vs IConfig. Are there things I don't need to serialize?
//  it appears that I was moving some things OUT OF ISettings (colors, applications, areas, groups, filters, buttons)
//    because I had added IEntity which allows me to store unqiue IDs for each.
export interface IConfig {
  system: ISystem;
  apps: IEntity[];
  areas: string[];
  filters: IEntity[];
  settings: ISettings;
  buttons: IButtonInfo[];
  groups: IGroupInfo[];
}
