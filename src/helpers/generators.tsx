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

  const filteredButtons = buttons.filter((btn) => {
    if (!btn.tags) return false;
    return btn.tags?.indexOf(group.tag) >= 0;
  });

  //stretch buttons across bottom of groups
  switch (filteredButtons.length % 3) {
    case 2:
      filteredButtons[filteredButtons.length - 1].size = "medium";
      filteredButtons[filteredButtons.length - 2].size = "medium";
      break;
    case 1:
      filteredButtons[filteredButtons.length - 1].size = "large";
      break;
  }

  return (
    <Group key={group.title} groupInfo={group}>
      {filteredButtons.map((btnInfo) =>
        createButton(btnInfo, forceLabels, addButton, groupColor)
      )}
    </Group>
  );
};
