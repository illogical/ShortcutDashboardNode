import { IGroupInfo } from "../models/groupInfo";
import { IButtonInfo } from "../models/buttonInfo";
import { ColorSelector } from "../helpers/colorSelector";
import React from "react";
import { compareTagsToFilters } from "../helpers/compareTags";
import { Button } from "./Button";
import { ButtonGroup } from "./ButtonGroup";

interface AreaProps {
  app: number;
  area: string;
  groups: IGroupInfo[]; //pass all groups
  buttons: IButtonInfo[]; //pass all buttons
  filter: number;
  selectedGroup?: IGroupInfo;
  colorSelector: ColorSelector;
  forceLabels: boolean;
  editEnabled: boolean;
  onClick: (buttonInfo: IButtonInfo) => void;
  selectGroup: (group: IGroupInfo) => void;
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
  selectGroup,
  selectedGroup,
  onClick,
}: AreaProps) => {
  const untaggedButtonColor = colorSelector.getColor();

  const filterButtons = buttons.filter((button) =>
    compareTagsToFilters(filter, button.filterIds)
  );

  const grouplessButtons = filterButtons
    .filter(
      (btn) =>
        (btn.app === "all" || btn.appId === app) &&
        btn.area === area &&
        !btn.group
    ) // get untagged buttons
    .map((btnInfo, index) => (
      <Button
        buttonInfo={btnInfo}
        index={index}
        forceLabel={forceLabels}
        editEnabled={editEnabled}
        onClick={onClick}
        borderColor={untaggedButtonColor}
        size={btnInfo.size}
        key={btnInfo.id}
      />
    ));

  const groupsByArea = groups
    .filter(
      (grp) => (grp.appId === -1 || grp.appId === app) && grp.area === area
    )
    .map((group) => (
      <ButtonGroup
        group={group}
        buttons={filterButtons}
        colorSelector={colorSelector}
        forceLabels={forceLabels}
        editEnabled={editEnabled}
        onClick={onClick}
        selectGroup={selectGroup}
        selectedGroup={selectedGroup}
      />
    ));

  return (
    <React.Fragment>{[...groupsByArea, ...grouplessButtons]}</React.Fragment>
  );
};
