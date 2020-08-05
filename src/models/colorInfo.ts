import { IEntity } from "./entity";

export interface IColorInfo {
  background: string;
  buttonBackground: string;
  buttonText: string;
  buttonBorder: string;
  buttons: string[]; // TODO: remove buttons property
  options: IEntity[];
}
