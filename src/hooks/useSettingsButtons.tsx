import { IButtonInfo } from "../models/buttonInfo";
import React, { useState } from "react";
import { Button } from "../components/Button";
import { AppMenu } from "../components/AppMenu";
import "../styles/slidingPanel.css";
import { IEntity } from "../models/entity";

export const useSettingsButtons = (
  apps: IEntity[],
  color: string,
  setEditEnabled: () => void
) => {
  const [, setIsSettingsOpen] = useState(false);
  const [forceLabels, setForceLabels] = useState(false);
  const [appMenuOpen, setAppMenuOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(103); // blender? TODO: support a default app

  /* TODO: create a useEditMode that tracks editEnabled? needs to supply an onclick event for selecting buttons (and somehow allow editing groups)
    -needs to supply components for editing groups and buttons
  */

  const toggleForceLabel = () => {
    setForceLabels((x) => !x);
  };

  const toggleSettings = () => {
    setIsSettingsOpen((x) => !x);
  };

  const toggleEdit = () => {
    setEditEnabled();
  };

  const showAppMenu = () => setAppMenuOpen(true);
  const hideAppMenu = () => setAppMenuOpen(false);
  const selectApp = (app: number) => setSelectedApp(app);

  const systemButtonsComponent = (
    <SystemButtons
      color={color}
      forceLabels={forceLabels}
      showAppMenu={showAppMenu}
      toggleEdit={toggleEdit}
      toggleForceLabel={toggleForceLabel}
      toggleSettings={toggleSettings}
    />
  );

  const applicationMenuComponent = (
    <AppMenu
      isOpen={appMenuOpen}
      close={hideAppMenu}
      apps={apps}
      selectApp={selectApp}
      selectedApp={selectedApp}
    ></AppMenu>
  );

  return [
    systemButtonsComponent,
    applicationMenuComponent,
    forceLabels,
    selectedApp,
  ] as const;
};

interface ISystemButtonsProps {
  color: string;
  forceLabels: boolean;
  toggleForceLabel: () => void;
  toggleSettings: () => void;
  toggleEdit: () => void;
  showAppMenu: () => void;
}

const SystemButtons = ({
  color,
  forceLabels,
  toggleForceLabel,
  toggleSettings,
  toggleEdit,
  showAppMenu,
}: ISystemButtonsProps) => {
  const editBtn: IButtonInfo = {
    id: -1,
    label: "Edit Mode",
    area: "settings",
    command: {
      // uses a custom onClick
    },
  };

  const labelToggleBtn: IButtonInfo = {
    id: -2,
    label: "Toggle Icons",
    area: "settings",
    command: {
      // uses a custom onClick
    },
  };

  const appBtn: IButtonInfo = {
    id: -3,
    label: "Switch App",
    area: "settings",
    command: {
      // uses a custom onClick
    },
  };

  const settingsBtn: IButtonInfo = {
    id: -4,
    label: "Settings",
    area: "settings",
    icon: "fad fa-cog fa-3x",
    command: {
      // uses a custom onClick
    },
  };

  const defaultStyle = {
    borderColor: color,
    forceLabel: forceLabels,
    editEnabled: false,
    index: 0,
  };

  return (
    <React.Fragment>
      <Button
        {...defaultStyle}
        buttonInfo={editBtn}
        key={editBtn.label}
        size="default"
        onClick={toggleEdit}
      />
      <Button
        {...defaultStyle}
        buttonInfo={labelToggleBtn}
        key={labelToggleBtn.label}
        size="default"
        onClick={toggleForceLabel}
      />
      <Button
        {...defaultStyle}
        buttonInfo={appBtn}
        size="default"
        onClick={showAppMenu}
      />
      <Button
        {...defaultStyle}
        buttonInfo={settingsBtn}
        key={settingsBtn.label}
        size="default"
        onClick={toggleSettings}
      />
    </React.Fragment>
  );
};
