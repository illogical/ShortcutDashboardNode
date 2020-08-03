import { IGroupInfo } from "../models/groupInfo";
import { IButtonInfo } from "../models/buttonInfo";
import { ColorSelector } from "../helpers/colorSelector";
import createButton from "./LayoutGenerator";
import { createGroup } from "../helpers/generators";
import React from "react";

interface AreaProps {
  app: string;
  area: string;
  groups: IGroupInfo[]; //pass all groups
  buttons: IButtonInfo[]; //pass all buttons
  colorSelector: ColorSelector;
  forceLabels: boolean;
  addButton: (buttonInfo: IButtonInfo) => void;
}

export const Area = ({
  app,
  area,
  groups,
  buttons,
  colorSelector,
  forceLabels,
  addButton,
}: AreaProps) => {
  const untaggedButtonColor = colorSelector.getColor();

  const grouplessButtons = buttons
    .filter(
      (btn) =>
        (btn.app === "all" || btn.app === app) &&
        btn.area === area &&
        !btn.group
    ) // get untagged buttons
    .map((btnInfo) =>
      createButton(btnInfo, forceLabels, addButton, untaggedButtonColor)
    );

  const groupsByArea = groups
    .filter(
      (grp) => (grp.app === "all" || grp.app === app) && grp.area === area
    )
    .map((grp) =>
      createGroup(grp, buttons, colorSelector, forceLabels, addButton)
    );

  return (
    <React.Fragment>{[...groupsByArea, ...grouplessButtons]}</React.Fragment>
  );
};
