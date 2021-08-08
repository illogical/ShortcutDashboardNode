import { IButtonInfo } from './buttonInfo';
import { IGroupInfo } from './groupInfo';
import { IEntity } from './entity';
import { ISettings } from './settings';
import { IAppSettings } from './appSettings';
import { IRelationships } from './relationships';
import { ILayout } from './layout';

/* Last I had been remapping ISettings to IConfig
// 
//  Are there things I don't need to serialize?
//  it appears that I was moving some things OUT OF ISettings (colors, applications, areas, groups, filters, buttons)
//    because I had added IEntity which allows me to store unqiue IDs for each.
*/
export interface IConfig {
    system: IAppSettings; // TODO: kill system (replaced by appSettings)
    appSettings: IAppSettings;
    apps: IEntity[];
    layouts: ILayout[];

    // these need to go:
    areas: string[]; // TODO: ideally this would be an enum. top, main, bottom
    filters: IEntity[];
    settings: ISettings; // TODO: kill ISettings
    buttons: IButtonInfo[];
    groups: IGroupInfo[];
    relationships: IRelationships;
}
