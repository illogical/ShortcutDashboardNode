import React, { useState } from "react";
import { IButtonInfo } from "../models/buttonInfo";
import { Modifier } from "../models/enums";
import { Button } from "./Button";

interface EditButtonPanelProps {
  selectedButton?: IButtonInfo;
}

export const EditButtonPanel = ({ selectedButton }: EditButtonPanelProps) => {
  const [modifiers, setModifier] = useState({
    shift: false,
    ctrl: false,
    alt: false,
  });

  if (!selectedButton) {
    return (
      <div className="edit-panel edit-form">
        Select a button or group to modify it
      </div>
    );
  }

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
    selectedButton.command.mods = mods;
  };

  return (
    <div className="edit-panel">
      <div className="title centered">EDIT BUTTON</div>
      <div className="edit-form">
        <FieldGroup label="LABEL">
          <input type="text" className="lg" value={selectedButton.label} />
        </FieldGroup>
        <FieldGroup label="SHORTCUT KEYS">
          <input
            type="text"
            className="lg"
            value={
              selectedButton.command.keys ? selectedButton.command.keys : ""
            }
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
              onChange={() => modifierClick(Modifier.shift)}
            />
          </div>
          <div className="edit-checkbox">
            <div className="edit-label">ALT </div>
            <input
              type="checkbox"
              checked={modifiers.alt}
              className="check-lg"
              onChange={() => modifierClick(Modifier.shift)}
            />
          </div>
        </FieldGroup>
        <FieldGroup label="PYTHON COMMAND">
          {" "}
          <input
            type="text"
            value={
              selectedButton.command.python ? selectedButton.command.python : ""
            }
          />
        </FieldGroup>
        <FieldGroup label="EXECUTE COMMAND">
          <input type="text" value={selectedButton.command.exec} />
        </FieldGroup>
        <FieldGroup label="ICON">
          <input
            type="text"
            value={selectedButton.icon ? selectedButton.icon : ""}
          />
          <div className="sample-button">
            <Button buttonInfo={selectedButton} editEnabled={true} />
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
