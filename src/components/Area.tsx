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
  filter: string;
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
    compareTagsToFilters(filter, button.tags)
  );

  const grouplessButtons = filteredButtons
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
      createGroup(grp, filteredButtons, colorSelector, forceLabels, addButton)
    );

  return (
    <React.Fragment>{[...groupsByArea, ...grouplessButtons]}</React.Fragment>
  );
};

const compareTagsToFilters = (filter: string, tags: string[] | undefined) => {
  if (!tags || tags.length === 0 || filter === "all") {
    // tagless buttons are always included
    return true;
  }

  for (let i = 0; i < tags.length; i++) {
    if (tags[i] === filter) {
      return true;
    }
  }
  return false;
};
