import React, { useState, useEffect } from "react";
import { IButtonInfo } from "../models/buttonInfo";
import { Modifier } from "../models/enums";
import { Button } from "./Button";
import { IConfig } from "../models/config";
import { SelectArea } from "./SelectArea";
import "antd/dist/antd.css"; // TODO: find out why this affects the font size
import { SelectGroup } from "./SelectGroup";
import { FieldGroup } from "./FieldGroup";
import { EditPanelHeader } from "./EditPanelHeader";

interface EditButtonPanelProps {
  panelTitle: string;
  config: IConfig;
  selectedButton?: IButtonInfo;
  onSave: (button: IButtonInfo) => void;
  onDiscard: () => void;
  onGroupFocus: (groupId: number) => void;
  onCreate: () => void;
  onChange: (button: IButtonInfo) => void;
}

export const EditButtonPanel = ({
  panelTitle,
  config,
  selectedButton,
  onSave,
  onDiscard,
  onGroupFocus,
  onCreate,
  onChange,
}: EditButtonPanelProps) => {
  const [modifiers, setModifier] = useState({
    shift: false,
    ctrl: false,
    alt: false,
  });
  const [updatedButton, setUpdatedButton] = useState<IButtonInfo>({
    id: -99,
    label: "",
    command: {},
  });

  useEffect(() => {
    if (selectedButton) {
      setUpdatedButton(selectedButton);
      if (selectedButton.groupId) {
        onGroupFocus(selectedButton.groupId);
      }
    }
    setModifier({
      shift: selectedButton?.command.mods
        ? selectedButton.command.mods.indexOf("s") >= 0
        : false,
      ctrl: selectedButton?.command.mods
        ? selectedButton.command.mods.indexOf("c") >= 0
        : false,
      alt: selectedButton?.command.mods
        ? selectedButton.command.mods.indexOf("a") >= 0
        : false,
    });
  }, [selectedButton]);

  useEffect(() => {
    // when updatedButton changes then run onChange
    onChange(updatedButton);
  }, [updatedButton]);

  // no button is selected
  if (!selectedButton) {
    return (
      <div>
        <EditPanelHeader
          panelTitle={panelTitle}
          onClose={onDiscard}
          onCreate={onCreate}
        />
        <div className="edit-form no-select">
          Select a button or group to modify it
        </div>
      </div>
    );
  }

  const setMods = () => {
    let mods = "";
    if (modifiers.shift) {
      mods += "s";
    }
    if (modifiers.ctrl) {
      mods += "c";
    }
    if (modifiers.alt) {
      mods += "a";
    }
    return mods;
  };

  const saveUpdatedButton = () => {
    const mods = setMods();

    onSave({
      ...updatedButton,
      command: {
        ...updatedButton.command,
        mods: mods ? mods : undefined,
      },
    });
  };

  const updateLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedButton({ ...updatedButton, label: e.target.value });
  };

  const updateKeys = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedButton({
      ...updatedButton,
      command: {
        ...updatedButton.command,
        keys: e.target.value,
      },
    });
  };

  const updatePython = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedButton({
      ...updatedButton,
      command: {
        ...updatedButton.command,
        python: e.target.value,
      },
    });
  };

  const updateExec = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedButton({
      ...updatedButton,
      command: {
        ...updatedButton.command,
        exec: e.target.value,
      },
    });
  };

  // TODO: need to look up group to get area for most buttons
  const onSelectArea = (area: string) =>
    setUpdatedButton({
      ...updatedButton,
      groupId: undefined,
      area,
    });

  const onSelectGroup = (groupId: number) => {
    onGroupFocus(groupId);
    setUpdatedButton({
      ...updatedButton,
      groupId,
      area: undefined,
    });
  };

  const modifierClick = (mod: Modifier) => {
    let mods = "";
    switch (mod) {
      case Modifier.shift:
        mods += "s";
        setModifier((x) => {
          return { ...x, shift: !x.shift };
        });
        break;
      case Modifier.ctrl:
        mods += "c";
        setModifier((x) => {
          return { ...x, ctrl: !x.ctrl };
        });
        break;
      case Modifier.alt:
        mods += "a";
        setModifier((x) => {
          return { ...x, alt: !x.alt };
        });
        break;
    }

    // update the button command
    setUpdatedButton({
      ...updatedButton,
      command: {
        ...updatedButton.command,
        mods: mods ? mods : undefined,
      },
    });
  };

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
        onCreate={onCreate}
      />
      <div className="edit-buttons">        
        <Button
          className="cancel"
          buttonInfo={discardBtn}
          editEnabled={true}
          index={0}
          borderColor="#9E424E"
          onClick={onDiscard}
        />
        <Button
          buttonInfo={saveBtn}
          editEnabled={true}
          index={0}
          borderColor="#6DB1D1"
          onClick={saveUpdatedButton}
        />
      </div>
      <div className="edit-form">
        <FieldGroup label="LABEL">
          <input
            type="text"
            className="lg"
            value={updatedButton.label}
            onChange={updateLabel}
          />
        </FieldGroup>
        <FieldGroup label="SHORTCUT KEYS">
          <input
            type="text"
            className="lg"
            value={updatedButton.command.keys ? updatedButton.command.keys : ""}
            onChange={updateKeys}
          />
        </FieldGroup>
        <FieldGroup>
          <div className="edit-checkbox">
            <div className="edit-label">SHIFT </div>
            <input
              type="checkbox"
              checked={modifiers.shift}
              className="check-lg"
              onChange={() => modifierClick(Modifier.shift)}
            />
          </div>
          <div className="edit-checkbox">
            <div className="edit-label">CTRL </div>
            <input
              type="checkbox"
              checked={modifiers.ctrl}
              className="check-lg"
              onChange={() => modifierClick(Modifier.ctrl)}
            />
          </div>
          <div className="edit-checkbox">
            <div className="edit-label">ALT </div>
            <input
              type="checkbox"
              checked={modifiers.alt}
              className="check-lg"
              onChange={() => modifierClick(Modifier.alt)}
            />
          </div>
        </FieldGroup>
        <FieldGroup label="PYTHON COMMAND">
          {" "}
          <input
            type="text"
            value={
              updatedButton.command.python ? updatedButton.command.python : ""
            }
            onChange={updatePython}
          />
        </FieldGroup>
        <FieldGroup label="EXECUTE COMMAND">
          <input
            type="text"
            value={updatedButton.command.exec ? updatedButton.command.exec : ""}
            onChange={updateExec}
          />
        </FieldGroup>
        <FieldGroup label="ICON">
          <input
            type="text"
            className="lg"
            value={updatedButton.icon ? updatedButton.icon : ""}
          />
          <div className="sample-button">
            <Button buttonInfo={updatedButton} editEnabled={true} index={0} />
          </div>
        </FieldGroup>
        <FieldGroup label="AREA">
          <SelectArea
            area={updatedButton.area}
            areas={config.areas}
            onSelect={onSelectArea}
          />
        </FieldGroup>
        <FieldGroup label="GROUP">
          <SelectGroup
            groupId={updatedButton.groupId}
            groups={config.groups}
            onSelect={onSelectGroup}
          />
        </FieldGroup>
      </div>
    </div>
  );
};
