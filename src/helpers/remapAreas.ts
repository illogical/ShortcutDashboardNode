import { toLower } from 'lodash';
import { Area } from '../models/enums';

export const remapAreas = (area: string): Area => {
    switch (area.toLowerCase()) {
        // TODO: how to simplify common vs. main vs. general vs. favorites? Common is just above the main area. Should I simplify?
        case 'common':
            return Area.Common;
        case 'main':
        case 'general':
            return Area.Main;
        case 'top':
            return Area.Top;
        case 'bottom':
        case 'favorites':
            return Area.Bottom;
        default:
            throw new Error(`Unexpected area found: ${area}`);
    }
};
