import { IGroupInfo } from "../models/groupInfo";
import { IButtonInfo } from "../models/buttonInfo";
import { ColorSelector } from "../helpers/colorSelector";
import createButton from "./LayoutGenerator";
import { createGroup } from "../helpers/generators";
import React from "react";

interface AreaProps {
  app: number;
  area: string;
  groups: IGroupInfo[]; //pass all groups
  buttons: IButtonInfo[]; //pass all buttons
  filter: number;
  colorSelector: ColorSelector;
  forceLabels: boolean;
  addButton: (buttonInfo: IButtonInfo) => void;
}

export const Area = ({
  app,
  area,
  groups,
  buttons,
  filter,
  colorSelector,
  forceLabels,
  addButton,
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
      createButton(btnInfo, forceLabels, addButton, untaggedButtonColor)
    );

  //TODO: just decided "all" will be -1
  const groupsByArea = groups
    .filter(
      (grp) => (grp.appId === -1 || grp.appId === app) && grp.area === area
    )
    .map((grp) =>
      createGroup(grp, filteredButtons, colorSelector, forceLabels, addButton)
    );

  return (
    <React.Fragment>{[...groupsByArea, ...grouplessButtons]}</React.Fragment>
  );
};

const compareTagsToFilters = (
  filterId: number,
  filterIds: number[] | undefined
) => {
  if (!filterIds || filterIds.length === 0 || filterId === -1) {
    // tagless buttons are always included
    return true;
  }

  for (let i = 0; i < filterIds.length; i++) {
    if (filterIds[i] === filterId) {
      return true;
    }
  }
  return false;
};
