import React, { useState } from "react";
import { IButtonInfo } from "../models/buttonInfo";
import { IGroupInfo } from "../models/groupInfo";
import { Modifier } from "../models/enums";
import { IConfig } from "../models/config";
import "../styles/editPanel.css";
import { EditButtonPanel } from "../components/EditButtonPanel";

export const useEditMode = (
  config: IConfig,
  selectedButton: IButtonInfo | undefined,
  saveConfig: (saveConfig: IConfig) => void,
  exitEdit: () => void
) => {
  const [editEnabled, setEditEnabled] = useState(false);
  const [editForm, setEditForm] = useState(); // decides if button or group is being modified

  // TODO: keep history of config and add an UNDO button. So save on Blur?
  const [configHistory, setConfigHistory] = useState([{ ...config }]);
  const [configHistoryPosition, setConfigHistoryPosition] = useState(0);

  const addToHistory = () => {
    setConfigHistory((x) => {
      return [...x, config];
    });
  };

  const handleSave = (button: IButtonInfo) => {
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

  const handleDiscard = () => exitEdit();

  // TODO: need a Create Button button and Create Group button
  const editButtonPanelComponent = (
    <EditButtonPanel
      panelTitle="EDIT MODE"
      selectedButton={selectedButton}
      onSave={handleSave}
      onDiscard={handleDiscard}
    />
  );

  return [editButtonPanelComponent] as const;
};

// TODO: provide an edit button form
// TOOD: label above full width field. use Ant Design for form?

interface EditGroupPanelProps {
  groupInfo: IGroupInfo;
}
// TODO: provide an edit group form
const EditGroupPanel = ({ groupInfo }: EditGroupPanelProps) => {};
