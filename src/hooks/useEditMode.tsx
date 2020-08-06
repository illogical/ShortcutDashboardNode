import React, { useState } from "react";
import { IButtonInfo } from "../models/buttonInfo";
import { IGroupInfo } from "../models/groupInfo";
import { Modifier } from "../models/enums";
import { IConfig } from "../models/config";
import "../styles/editPanel.css";

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
    <EditButtonPanel selectedButton={selectedButton} />
  );

  return [editButtonPanelComponent] as const;
};

// TODO: provide an edit button form
// TOOD: label above full width field. use Ant Design for form?
interface EditButtonPanelProps {
  selectedButton?: IButtonInfo;
}
const EditButtonPanel = ({ selectedButton }: EditButtonPanelProps) => {
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
        <div className="edit-label">Label</div>
        <div className="edit-field">
          <input type="text" value={selectedButton.label} />
        </div>
        <div className="edit-label">Shortcut Keys</div>
        <div className="edit-field">
          <input type="text" value={selectedButton.command.keys} />
        </div>
        <div className="edit-checkbox">
          Shift{" "}
          <input
            type="checkbox"
            checked={modifiers.shift}
            onChange={() => modifierClick(Modifier.shift)}
          />
        </div>
        <div className="edit-checkbox">
          Ctrl{" "}
          <input
            type="checkbox"
            checked={modifiers.ctrl}
            onChange={() => modifierClick(Modifier.shift)}
          />
        </div>
        <div className="edit-checkbox">
          Alt{" "}
          <input
            type="checkbox"
            checked={modifiers.alt}
            onChange={() => modifierClick(Modifier.shift)}
          />
        </div>
        <div className="edit-label">Python Command</div>
        <div className="edit-field">
          <input type="text" value={selectedButton.command.python} />
        </div>
        <div className="edit-label">Execute Command</div>
        <div className="edit-field">
          <input type="text" value={selectedButton.command.exec} />
        </div>
      </div>
    </div>
  );
};

interface EditGroupPanelProps {
  groupInfo: IGroupInfo;
}
// TODO: provide an edit group form
const EditGroupPanel = ({ groupInfo }: EditGroupPanelProps) => {};
