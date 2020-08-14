import React, { useState } from "react";
import { IButtonInfo } from "../models/buttonInfo";
import { IGroupInfo } from "../models/groupInfo";
import { IConfig } from "../models/config";
import "../styles/editPanel.css";
import { EditButtonPanel } from "../components/EditButtonPanel";
import { EditGroupPanel } from "../components/EditGroupPanel";

export const useEditMode = (
  config: IConfig,
  selectedButton: IButtonInfo | undefined,
  selectedGroup: IGroupInfo | undefined,
  saveConfig: (saveConfig: IConfig) => void,
  exitEdit: () => void
) => {
  // TODO: need a way to swap between group and button
  //const [editMode, setEditMode] = useState<"button" | "group">("button");
  const [focusedGroupId, setFocusedGroupId] = useState<number | undefined>();

  // TODO: keep history of config and add an UNDO button. So save on Blur?
  const [configHistory, setConfigHistory] = useState([{ ...config }]);
  //const [configHistoryPosition, setConfigHistoryPosition] = useState(0);

  const addToHistory = () => {
    setConfigHistory((x) => {
      return [...x, config];
    });
  };

  const handleSaveButton = (button: IButtonInfo) => {
    // look up button and replace it
    const updatedConfig = {
      ...config,
      buttons: config.buttons.reduce((prev, cur) => {
        if (cur.id === button.id) {
          return [...prev, button];
        }
        return [...prev, cur];
      }, [] as IButtonInfo[]),
    };

    saveConfig(updatedConfig);
    exitEdit();
  };

  const handleSaveGroup = (group: IGroupInfo) => {};

  const handleDiscard = () => exitEdit();

  const editButtonPanelComponent = (
    <EditButtonPanel
      panelTitle="EDIT MODE"
      config={config}
      selectedButton={selectedButton}
      onSave={handleSaveButton}
      onDiscard={handleDiscard}
      onGroupFocus={setFocusedGroupId}
    />
  );

  const editGroupPanelComponent = (
    <EditGroupPanel
      panelTitle="EDIT MODE"
      config={config}
      selectedGroup={selectedGroup}
      onSave={handleSaveGroup}
      onDiscard={handleDiscard}
      onGroupFocus={setFocusedGroupId}
    />
  );

  const showPanel = selectedGroup
    ? editGroupPanelComponent
    : editButtonPanelComponent;

  return [showPanel, focusedGroupId] as const;
};

// TODO: provide an edit button form
// TOOD: label above full width field. use Ant Design for form?
