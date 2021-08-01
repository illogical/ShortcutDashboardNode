// TODO: map config structure to components

import { IConfig } from '../models/config';
import { IRelationships } from '../models/relationships';
import React from 'react';
import { ButtonGroup } from '../components/ButtonGroup';
import { IButtonInfo } from '../models/buttonInfo';
import { IGroupInfo } from '../models/groupInfo';
import { ColorSelector } from './colorSelector';

// THIS IS ALL A BAD IDEA
// TODO: delete this file. Use the Relationships in the components

// export const mapButtonsToGroups = (
//     config: IConfig,
//     colorSelector: ColorSelector,
//     forceLabels: boolean,
//     editEnabled: boolean
// ): JSX.Element | null => {
//     if (!config.relationships) {
//         return null;
//     }

//     const allButtons: Record<number, IButtonInfo> = config.buttons.reduce((prev, cur) => {
//         return { ...prev, [cur.id]: cur };
//     }, {});

//     const allGroups: Record<number, IGroupInfo> = config.groups.reduce((prev, cur) => {
//         return { ...prev, [cur.id]: cur };
//     }, {});

//     const groups = config.groups.forEach((grp) => (
//         <ButtonGroup
//             group={allGroups[grp.id]}
//             buttons={getButtonsForGroup(allButtons, config.relationships.buttonsToGroup, grp.id)}
//             colorSelector={colorSelector}
//         />
//     ));

//     //.buttons.forEach(btn => <ButtonGroup  />);
//     return <React.Fragment>{groups}</React.Fragment>;
// };

// const getButtonsForGroup = (
//     allButtons: Record<number, IButtonInfo>,
//     buttonsToGroup: Record<number, number[]>,
//     groupId: number
// ): IButtonInfo[] => buttonsToGroup[groupId].map((btnId) => allButtons[btnId]);
