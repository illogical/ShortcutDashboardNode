import { IGroupInfo } from "../models/groupInfo";
import { IButtonInfo } from "../models/buttonInfo";
import { Group } from "../components/Group";
import React from "react";
import { Button } from "../components/Button";
import { ColorSelector } from "../helpers/colorSelector";

interface ButtonGroupProps {
  group: IGroupInfo;
  buttons: IButtonInfo[]; //pass all buttons
  colorSelector: ColorSelector;
  forceLabels: boolean;
  editEnabled: boolean;
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
  onClick,
  selectGroup,
  selectedGroup,
}: ButtonGroupProps) => {
  const groupColor = colorSelector.getColor();
  group.color = groupColor;

  const groupButtons = buttons.filter((btn) => {
    if (!btn.group) return false;
    return btn.group === group.tag;
  });

  if (groupButtons.length === 0) {
    return null;
  }

  return (
    <Group
      key={group.name}
      groupInfo={group}
      editEnabled={editEnabled}
      selected={selectedGroup}
      selectGroup={selectGroup}
    >
      {groupButtons.map((btnInfo, index) => (
        <Button
          buttonInfo={btnInfo}
          index={index}
          forceLabel={forceLabels}
          editEnabled={editEnabled}
          onClick={onClick}
          borderColor={groupColor}
          key={btnInfo.id}
          draggable={editEnabled}
        />
      ))}
    </Group>
  );
};
