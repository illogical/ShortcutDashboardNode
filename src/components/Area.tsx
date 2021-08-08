import { IGroupInfo } from '../models/groupInfo';
import { IButtonInfo } from '../models/buttonInfo';
import { ColorSelector } from '../helpers/colorSelector';
import React from 'react';
import { compareTagsToFilters } from '../helpers/compareTags';
import { Button } from './Button';
import { ButtonGroup } from './ButtonGroup';
import { remapAreas } from '../helpers/remapAreas';
import { toRecord } from '../helpers/toRecord';
import { ILayout } from '../models/layout';
import { Area as AreaEnum } from '../models/enums';
import { IAppSettings } from '../models/appSettings';

interface AreaProps {
    layout: ILayout;
    area: AreaEnum;
    groups: IGroupInfo[]; //pass all groups (needed to show edit preview)
    buttons: IButtonInfo[]; //pass all buttons (needed to show edit preview)
    appSettings: IAppSettings;
    filter: number;
    selectedGroup?: IGroupInfo;
    focusedGroupId?: number;
    colorSelector: ColorSelector;
    forceLabels: boolean;
    editEnabled: boolean;
    onClick: (buttonInfo: IButtonInfo) => void;
    selectGroup: (group: IGroupInfo) => void;
}

export const Area = ({
    layout,
    area,
    groups,
    buttons,
    appSettings,
    colorSelector,
    forceLabels,
    editEnabled,
    focusedGroupId,
    selectGroup,
    selectedGroup,
    onClick,
}: AreaProps) => {
    const untaggedButtonColor = colorSelector.getColor();

    // TODO: bring back filters for Blender?
    // const filteredButtons = useMemo(
    //     () => layout.buttons.filter((button) => compareTagsToFilters(filter, button.filterIds)),
    //     [layout, filter]
    // );

    const buttonIdsForArea = layout.relationships.buttonsToArea[area];
    const groupIdsForArea = layout.relationships.groupsToArea[area];

    const allButtons = toRecord(buttons.concat(appSettings.pinnedButtons), (b) => b.id);
    const allGroups = toRecord(groups, (g) => g.id);

    const groupsForArea: IGroupInfo[] =
        groupIdsForArea && Object.keys(groupIdsForArea).length > 0
            ? groupIdsForArea.map((g) => allGroups[g])
            : [];

    const buttonsByGroup = (groupId: number) =>
        layout.relationships.buttonsToGroup &&
        Object.keys(layout.relationships.buttonsToGroup).length > 0
            ? layout.relationships.buttonsToGroup[groupId].map((b) => allButtons[b])
            : [];

    const groupsByArea = groupsForArea.map((grp) => (
        <ButtonGroup
            key={grp.id}
            group={grp}
            buttons={buttonsByGroup(grp.id)} // TODO: this should be buttons filtered by group
            colorSelector={colorSelector}
            forceLabels={forceLabels}
            editEnabled={editEnabled}
            onClick={onClick}
            selectGroup={selectGroup}
            selectedGroup={selectedGroup}
            focus={editEnabled && focusedGroupId === grp.id}
        />
    ));

    const buttonsForArea: IButtonInfo[] = buttonIdsForArea
        ? buttonIdsForArea.map((id) => allButtons[id])
        : [];

    const pinnedButtonsForArea =
        appSettings.pinnedButtonsToArea &&
        Object.keys(appSettings.pinnedButtonsToArea).length > 0 &&
        appSettings.pinnedButtonsToArea[area]
            ? appSettings.pinnedButtonsToArea[area].map((id) => allButtons[id])
            : [];

    const grouplessButtons = buttonsForArea
        .concat(pinnedButtonsForArea)
        .map((btnInfo, index) => (
            <Button
                buttonInfo={btnInfo}
                key={btnInfo.id}
                index={index}
                forceLabel={forceLabels}
                editEnabled={editEnabled}
                onClick={onClick}
                borderColor={untaggedButtonColor}
            />
        ));

    return <React.Fragment>{[...groupsByArea, ...grouplessButtons]}</React.Fragment>;
};
