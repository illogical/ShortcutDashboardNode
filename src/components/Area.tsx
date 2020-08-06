import { IGroupInfo } from "../models/groupInfo";
import { IButtonInfo } from "../models/buttonInfo";
import { ColorSelector } from "../helpers/colorSelector";
import createButton from "./LayoutGenerator";
import { createGroup } from "../helpers/generators";
import React from "react";
import { compareTagsToFilters } from "../helpers/compareTags";

interface AreaProps {
  app: number;
  area: string;
  groups: IGroupInfo[]; //pass all groups
  buttons: IButtonInfo[]; //pass all buttons
  filter: number;
  colorSelector: ColorSelector;
  forceLabels: boolean;
  editEnabled: boolean;
  onClick: (buttonInfo: IButtonInfo) => void;
}

export const Area = ({
  app,
  area,
  groups,
  buttons,
  filter,
  colorSelector,
  forceLabels,
  editEnabled,
  onClick,
}: AreaProps) => {
  const untaggedButtonColor = colorSelector.getColor();

  const filteredButtons = buttons.filter((button) =>
    compareTagsToFilters(filter, button.filterIds)
  );

  const grouplessButtons = filteredButtons
    .filter(
      (btn) =>
        (btn.app === "all" || btn.appId === app) &&
        btn.area === area &&
        !btn.group
    ) // get untagged buttons
    .map((btnInfo) =>
      createButton(
        btnInfo,
        forceLabels,
        editEnabled,
        onClick,
        untaggedButtonColor
      )
    );

  const groupsByArea = groups
    .filter(
      (grp) => (grp.appId === -1 || grp.appId === app) && grp.area === area
    )
    .map((grp) =>
      createGroup(
        grp,
        filteredButtons,
        colorSelector,
        forceLabels,
        editEnabled,
        onClick
      )
    );

  return (
    <React.Fragment>{[...groupsByArea, ...grouplessButtons]}</React.Fragment>
  );
};
