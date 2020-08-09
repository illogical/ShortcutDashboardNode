import React, { useState, useEffect } from "react";
import { IButtonInfo } from "../models/buttonInfo";
import { Modifier } from "../models/enums";
import { Button } from "./Button";

interface EditButtonPanelProps {
  panelTitle: string;
  selectedButton?: IButtonInfo;
  onSave: (IButtonConfig: IButtonInfo) => void;
  onDiscard: () => void;
}

export const EditButtonPanel = ({
  panelTitle,
  selectedButton,
  onSave,
  onDiscard,
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

  // no button is selected
  if (!selectedButton) {
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

  // TODO: need an onChange for each modifier to compile the booleans and create string

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
      <div className="title centered">{panelTitle}</div>
      <div className="edit-buttons">
        <Button
          buttonInfo={saveBtn}
          editEnabled={true}
          index={0}
          borderColor="#6DB1D1"
          onClick={saveUpdatedButton}
        />
        <Button
          buttonInfo={discardBtn}
          editEnabled={true}
          index={0}
          borderColor="#9E424E"
          onClick={onDiscard}
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
            value={updatedButton.command.python}
            onChange={updatePython}
          />
        </FieldGroup>
        <FieldGroup label="EXECUTE COMMAND">
          <input
            type="text"
            value={updatedButton.command.exec}
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
      </div>
    </div>
  );
};

interface FieldGroupProps {
  label?: string;
}

const FieldGroup: React.FC<FieldGroupProps> = ({ label, children }) => (
  <div className="field-group">
    {label && <div className="edit-label">{label}</div>}
    <div className="edit-field">{children}</div>
  </div>
);
