import { IGroupInfo } from '../models/groupInfo';
import { IButtonInfo } from '../models/buttonInfo';
import { ColorSelector } from '../helpers/colorSelector';
import React, { useMemo } from 'react';
import { compareTagsToFilters } from '../helpers/compareTags';
import { Button } from './Button';
import { ButtonGroup } from './ButtonGroup';
import { IRelationships } from '../models/relationships';
import { remapAreas } from '../helpers/remapAreas';
import { toRecord } from '../helpers/toRecord';

interface AreaProps {
    relationships: IRelationships;
    app: number;
    area: string;
    groups: IGroupInfo[]; //pass all groups
    buttons: IButtonInfo[]; //pass all buttons
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
    relationships,
    app,
    area,
    groups,
    buttons,
    filter,
    colorSelector,
    forceLabels,
    editEnabled,
    focusedGroupId,
    selectGroup,
    selectedGroup,
    onClick,
}: AreaProps) => {
    const untaggedButtonColor = colorSelector.getColor();

    const filteredButtons = useMemo(
        () => buttons.filter((button) => compareTagsToFilters(filter, button.filterIds)),
        [buttons, filter]
    );

    // TODO: change these to use Relationships and/or toRecord
    // how to use dictionaries for multiple lookups? Example: button that matches appId, area, and group.

    const buttonIdsForArea = relationships.buttonsToArea[remapAreas(area)];
    const groupIdsForArea = relationships.groupsToArea[remapAreas(area)];

    const allButtons = toRecord(buttons, (b) => b.id);
    const allGroups = toRecord(groups, (g) => remapAreas(g.area));

    let areaButtons: IButtonInfo[] = [];
    if (buttonIdsForArea) {
        areaButtons = buttonIdsForArea.map((b) => allButtons[b]);
        //console.log('relationships area buttons count', areaButtons.length);
    }

    if (groupIdsForArea) {
        // TODO: need buttons by group here now that I know what groups are in this area

        if (groupIdsForArea.length > 0) {
            const areaGroups: IGroupInfo[] = groupIdsForArea.map((g) => allGroups[g]);
            console.log('Groups for area:', areaGroups);
        }

        const buttonsIdsForArea = groupIdsForArea.reduce<number[]>((prev, cur) => {
            const btns = relationships.buttonsToGroup[cur];
            return btns ? [...prev, ...btns] : prev;
        }, []);

        const test = buttonsIdsForArea.map((b) => allButtons[b]);
        console.log('All Buttons for area', test);
        //console.log('relationships area groups count', areaGroups.length);
    }

    // TODO: TEMP: compare current buttons to Relationships
    const grouplessFilter = (buttons: IButtonInfo[]) => {
        const filtered = buttons.filter(
            (btn) => (btn.app === 'all' || btn.appId === app) && btn.area === area && !btn.group
        ); // get untagged buttons

        console.log('AREA', area);
        console.log(`${filtered.length} groupless buttons`, filtered);
        console.log(`${areaButtons.length} area buttons`, areaButtons);

        return filtered;
    };

    // TODO: how to incorporate special handling for buttons across apps (brn.app === 'all')? Is that the same as appId === -1?
    const grouplessButtons = useMemo(
        () =>
            grouplessFilter(filteredButtons).map((btnInfo, index) => (
                <Button
                    buttonInfo={btnInfo}
                    key={btnInfo.id}
                    index={index}
                    forceLabel={forceLabels}
                    editEnabled={editEnabled}
                    onClick={onClick}
                    borderColor={untaggedButtonColor}
                />
            )),
        [filteredButtons, app, area, forceLabels, editEnabled]
    );

    const groupsByArea = useMemo(
        () =>
            groups
                .filter((grp) => (grp.appId === -1 || grp.appId === app) && grp.area === area)
                .map((grp) => (
                    <ButtonGroup
                        key={grp.id}
                        group={grp}
                        buttons={filteredButtons}
                        colorSelector={colorSelector}
                        forceLabels={forceLabels}
                        editEnabled={editEnabled}
                        onClick={onClick}
                        selectGroup={selectGroup}
                        selectedGroup={selectedGroup}
                        focus={editEnabled && focusedGroupId === grp.id}
                    />
                )),
        [
            filteredButtons,
            app,
            area,
            groups,
            forceLabels,
            editEnabled,
            selectedGroup,
            focusedGroupId,
        ]
    );

    // console.log('expected groups count', groupsByArea.length);
    // console.log('expected groupless buttons', grouplessButtons.length);

    return <React.Fragment>{[...groupsByArea, ...grouplessButtons]}</React.Fragment>;
};
