import { IButtonInfo } from './buttonInfo';
import { Area } from './enums';
import { IGroupInfo } from './groupInfo';
import { ILayout } from './layout';

export interface ISelectedInfo {
    layout: ILayout;
    button?: IButtonInfo;
    group?: IGroupInfo;
    area?: Area;
}
