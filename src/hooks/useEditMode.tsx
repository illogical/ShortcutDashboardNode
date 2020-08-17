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
  previewConfig: (saveConfig: IConfig) => void, // TODO: should this pass something up or should this be a variable being passed down?
  setSelectedButton: (button: IButtonInfo) => void,
  setSelectedGroup: (group: IGroupInfo) => void,
  exitEdit: () => void
) => {
  //const [editMode, setEditMode] = useState<"button" | "group">("button");
  const [focusedGroupId, setFocusedGroupId] = useState<number | undefined>();

  // TODO: keep history of config and add an UNDO button. So save on Blur?
  const [configHistory, setConfigHistory] = useState([{ ...config }]);
  //const [configHistoryPosition, setConfigHistoryPosition] = useState(0);

  // TODO: track a new button
  // TODO: plus icon needs to open the EditButtonPanel
  const [newButton, setNewButton] = useState<IButtonInfo>({
    id: -1,
    label: "",
    command: {},
  });

  // TODO: need to get current appId
  // TODO: need to provide a list of the areas that can have groups added
  const [newGroup] = useState<IGroupInfo>({
    id: -1,
    name: "",
    appId: -1,
    tag: "",
    area: "main",
  });

  const addToHistory = () => {
    setConfigHistory((x) => {
      return [...x, config];
    });
  };

  const handleCreateButton = () => setSelectedButton(newButton);
  const handleCreateGroup = () => setSelectedGroup(newGroup);

  const handleButtonChange = (button: IButtonInfo) => {
    if (button.id === -1) {
      const updatedConfig = {
        ...config,
        buttons: [
          ...config.buttons,
          {
            ...button,
          },
        ],
      };

      previewConfig(updatedConfig);

      return;
    }

    previewConfig(updateConfig(config, button));
  };

  const handleSaveButton = (button: IButtonInfo) => {
    if (button.id === -1) {
      // this is a new button
      const newId = config.system.lastId;

      const updatedConfig = {
        ...config,
        system: {
          ...config.system,
          lastId: newId + 1,
        },
        buttons: [
          ...config.buttons,
          {
            ...button,
            id: newId,
          },
        ],
      };

      saveConfig(updatedConfig);
      exitEdit();

      return;
    }

    saveConfig(updateConfig(config, button));
    exitEdit();
  };

  const handleSaveGroup = (group: IGroupInfo) => {};

  const handleDiscard = () => {
    previewConfig(config); // reset to the loaded config
    exitEdit();
  };

  const editButtonPanelComponent = (
    <EditButtonPanel
      panelTitle="EDIT BUTTON"
      config={config}
      selectedButton={selectedButton}
      onSave={handleSaveButton}
      onDiscard={handleDiscard}
      onGroupFocus={setFocusedGroupId}
      onCreate={handleCreateButton}
      onChange={handleButtonChange}
    />
  );

  const editGroupPanelComponent = (
    <EditGroupPanel
      panelTitle="EDIT GROUP"
      config={config}
      selectedGroup={selectedGroup}
      onSave={handleSaveGroup}
      onDiscard={handleDiscard}
      onGroupFocus={setFocusedGroupId}
      onCreateGroup={handleCreateGroup}
    />
  );

  const showPanel = selectedGroup
    ? editGroupPanelComponent
    : editButtonPanelComponent;

  return [showPanel, focusedGroupId] as const;
};

// look up button and replace it
const updateConfig = (config: IConfig, button: IButtonInfo) => {
  return {
    ...config,
    buttons: config.buttons.reduce((prev, cur) => {
      if (cur.id === button.id) {
        return [...prev, button];
      }
      return [...prev, cur];
    }, [] as IButtonInfo[]),
  };
};
