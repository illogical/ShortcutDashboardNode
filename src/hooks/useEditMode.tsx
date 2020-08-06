import React, { useState } from "react";
import { IButtonInfo } from "../models/buttonInfo";
import { IGroupInfo } from "../models/groupInfo";
import { Modifier } from "../models/enums";
import { IConfig } from "../models/config";
import "../styles/editPanel.css";
import { EditButtonPanel } from "../components/EditButtonPanel";

export const useEditMode = (
  config: IConfig,
  selectedButton: IButtonInfo | undefined
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

  // TODO: need a Create Button button and Create Group button
  const editButtonPanelComponent = (
    <EditButtonPanel panelTitle="EDIT MODE" selectedButton={selectedButton} />
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
