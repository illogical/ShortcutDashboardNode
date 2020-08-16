import React, { useEffect, useState } from "react";
import { IGroupInfo } from "../models/groupInfo";
import { IConfig } from "../models/config";
import { IButtonInfo } from "../models/buttonInfo";
import { Button } from "./Button";
import { FieldGroup } from "./FieldGroup";
import { SelectArea } from "./SelectArea";
import { EditPanelHeader } from "./EditPanelHeader";

export const EditGroupPanel = ({
  panelTitle,
  config,
  selectedGroup,
  onSave,
  onDiscard,
  onGroupFocus,
  onCreateGroup,
}: IEditGroupPanelProps) => {
  const [updatedGroup, setUpdatedGroup] = useState<IGroupInfo>({
    id: -99,
    name: "",
    area: "",
    appId: -1,
    tag: "",
  });

  useEffect(() => {
    if (selectedGroup) {
      setUpdatedGroup(selectedGroup);
      if (selectedGroup.id) {
        onGroupFocus(selectedGroup.id);
      }
    }
  }, [selectedGroup]);

  // no group is selected
  if (!selectedGroup) {
    return (
      <div>
        <i
          className="fad fa-times-circle fa-2x close-icon"
          onClick={onDiscard}
        ></i>
        <div className="title centered">{panelTitle}</div>
        <div className="edit-form">Select a button or group to modify it</div>
      </div>
    );
  }

  const saveUpdatedGroup = () => {
    onSave(updatedGroup);
  };

  const updateLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedGroup({ ...updatedGroup, name: e.target.value });
  };

  const updateTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedGroup({ ...updatedGroup, tag: e.target.value });
  };

  const onSelectArea = (area: string) =>
    setUpdatedGroup({
      ...updatedGroup,
      area,
    });

  const saveBtn: IButtonInfo = {
    id: -6,
    label: "SAVE",
    command: {},
  };

  const discardBtn: IButtonInfo = {
    id: -5,
    label: "DISCARD",
    command: {},
  };

  return (
    <div className="edit-panel">
      <EditPanelHeader
        panelTitle={panelTitle}
        onClose={onDiscard}
        onCreate={onCreateGroup}
      />
      <div className="edit-groups">
        <Button
          buttonInfo={saveBtn}
          editEnabled={true}
          index={0}
          borderColor="#6DB1D1"
          onClick={saveUpdatedGroup}
        />
        <Button
          buttonInfo={discardBtn}
          editEnabled={true}
          index={0}
          borderColor="#9E424E"
          onClick={onDiscard}
        />

        <div className="edit-form">
          <FieldGroup label="LABEL">
            <input
              type="text"
              className="lg"
              value={updatedGroup.name}
              onChange={updateLabel}
            />
          </FieldGroup>

          <FieldGroup label="TAG">
            <input
              type="text"
              className="lg"
              value={updatedGroup.tag}
              onChange={updateTag}
            />
          </FieldGroup>

          <FieldGroup label="AREA">
            <SelectArea
              area={updatedGroup.area}
              areas={config.areas}
              onSelect={onSelectArea}
            />
          </FieldGroup>

          {/* TODO: edit group name */}
          {/* TODO: edit group order (single column list with drag and drop) */}
          <div className="reorder-buttons"></div>
        </div>

        {/* TODO: add group selection via clicking on title */}
        {/* TODO: show the selected group */}
      </div>
    </div>
  );
};

interface IEditGroupPanelProps {
  panelTitle: string;
  config: IConfig;
  selectedGroup?: IGroupInfo;
  onSave: (group: IGroupInfo) => void;
  onDiscard: () => void;
  onGroupFocus: (groupId: number) => void;
  onCreateGroup: () => void;
}
