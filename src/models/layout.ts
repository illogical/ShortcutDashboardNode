import { IButtonInfo } from './buttonInfo';
import { IGroupInfo } from './groupInfo';
import { IRelationships } from './relationships';

export interface ILayout {
    name: string;
    buttons: IButtonInfo[];
    groups: IGroupInfo[];
    relationships: IRelationships;
}
