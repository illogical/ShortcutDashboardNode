import { IButtonInfo } from './buttonInfo';
import { IColorInfo } from './colorInfo';
import { Area } from './enums';

// application settings
export interface IAppSettings {
    lastId: number; // simple way to generate the next ID
    areas: Area[];
    colors: IColorInfo;
    pinnedButtons: IButtonInfo[];
    pinnedButtonsToArea: Record<Area, number[]>; // area, buttonId
}
