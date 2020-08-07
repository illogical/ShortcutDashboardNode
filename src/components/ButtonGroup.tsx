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

  //stretch buttons across bottom of groups
  switch (groupButtons.length % 3) {
    case 2:
      groupButtons[groupButtons.length - 1].size = "medium";
      groupButtons[groupButtons.length - 2].size = "medium";
      break;
    case 1:
      groupButtons[groupButtons.length - 1].size = "large";
      break;
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
          size={btnInfo.size}
          key={btnInfo.id}
        />
      ))}
    </Group>
  );
};
