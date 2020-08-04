import { IGroupInfo } from "../models/groupInfo";
import { IButtonInfo } from "../models/buttonInfo";
import { ColorSelector } from "./colorSelector";
import { Group } from "../components/Group";
import React from "react";
import { Button } from "../components/Button";

export const createButton = (
  button: IButtonInfo,
  forceLabels: boolean,
  addButton: (buttonInfo: IButtonInfo) => void,
  colorOverride?: string
) => {
  return (
    <Button
      buttonInfo={button}
      key={button.label}
      borderColor={colorOverride}
      size={button.size ? button.size : "default"}
      forceLabel={forceLabels}
      onClick={addButton}
    />
  );
};

export const createGroup = (
  group: IGroupInfo,
  buttons: IButtonInfo[], //pass all buttons
  colorSelector: ColorSelector,
  forceLabels: boolean,
  addButton: (buttonInfo: IButtonInfo) => void
) => {
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
    <Group key={group.title} groupInfo={group}>
      {groupButtons.map((btnInfo) =>
        createButton(btnInfo, forceLabels, addButton, groupColor)
      )}
    </Group>
  );
};
