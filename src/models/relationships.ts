import { Area } from './enums';

export interface IRelationships {
    buttonsToGroup: Record<number, number[]>; // groupId, buttonId[]
    buttonsToAreas: Record<number, Area[]>;
    buttonsToApps: Record<number, number[]>;
    groupsToArea: Record<number, number>; // TODO: groups can only be in a single area and typically the main area. Avoid groups for header and footer?
    groupsToApps: Record<number, number[]>;
}
