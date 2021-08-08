import { IGroupInfo } from '../models/groupInfo';
import { IButtonInfo } from '../models/buttonInfo';
import { Group } from '../components/Group';
import React from 'react';
import { Button } from '../components/Button';
import { ColorSelector } from '../helpers/colorSelector';

interface ButtonGroupProps {
    group: IGroupInfo;
    buttons: IButtonInfo[]; //pass all buttons
    colorSelector: ColorSelector;
    forceLabels: boolean;
    editEnabled: boolean;
    focus?: boolean;
    onClick: (buttonInfo: IButtonInfo) => void;
    selectGroup: (group: IGroupInfo) => void;
    selectedGroup?: IGroupInfo;
}

export const ButtonGroup = ({
    group,
    buttons,
    colorSelector,
    forceLabels,
    editEnabled,
    focus,
    onClick,
    selectGroup,
    selectedGroup,
}: ButtonGroupProps) => {
    const groupColor = colorSelector.getColor();
    group.color = groupColor;

    return (
        <Group
            groupInfo={group}
            editEnabled={editEnabled}
            selected={selectedGroup}
            focus={focus}
            selectGroup={selectGroup}
        >
            {buttons.map((btnInfo, index) => (
                <Button
                    buttonInfo={btnInfo}
                    key={btnInfo.id}
                    index={index}
                    forceLabel={forceLabels}
                    editEnabled={editEnabled}
                    onClick={onClick}
                    borderColor={groupColor}
                    draggable={editEnabled}
                />
            ))}
        </Group>
    );
};
