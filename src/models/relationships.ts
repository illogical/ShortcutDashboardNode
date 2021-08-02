import { Area } from './enums';

export interface IRelationships {
    buttonsToGroup: Record<number, number[]>; // groupId, buttonId[]
    buttonsToArea: Record<Area, number[]>; // area, buttonId[]
    buttonsToApp: Record<number, number[]>; // appId, buttonId[]
    groupsToApp: Record<number, number[]>; // appId, buttonId[]
    // TODO: groups can only be in a single area and typically the main area. Avoid groups for header and footer?
    groupsToArea: Record<Area, number[]>; // area, groupId[]
}
