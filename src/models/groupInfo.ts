export interface IGroupInfo {
    id: number;
    name: string;
    color?: string;
    area: string;
    appId: number; // TODO: remove replaced by relationships
    tag: string;
}
