import { IButtonInfo } from "../models/buttonInfo";
import React from "react";
import { Button } from "../components/Button";
import { AppMenu } from "../components/AppMenu";
import "../styles/slidingPanel.css";
import App from "../App";

export const useSettingsButtons = (apps: string[], color: string) => {
  const [, setIsSettingsOpen] = React.useState(false);
  const [forceLabels, setForceLabels] = React.useState(false);
  const [appMenuOpen, setAppMenuOpen] = React.useState(false);
  const [selectedApp, setSelectedApp] = React.useState("blender");

  const toggleForceLabel = () => {
    setForceLabels((x) => !x);
  };

  const toggleSettings = () => {
    setIsSettingsOpen((x) => !x);
  };

  const showAppMenu = () => setAppMenuOpen(true);
  const hideAppMenu = () => setAppMenuOpen(false);
  const selectApp = (app: string) => setSelectedApp(app);

  const systemButtonsComponent = (
    <SystemButtons
      color={color}
      forceLabels={forceLabels}
      showAppMenu={showAppMenu}
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
  showAppMenu: () => void;
}

const SystemButtons = ({
  color,
  forceLabels,
  toggleForceLabel,
  toggleSettings,
  showAppMenu,
}: ISystemButtonsProps) => {
  const labelToggleBtn: IButtonInfo = {
    label: "Toggle Icons",
    area: "settings",
    command: {
      // uses a custom onClick
    },
  };

  const appBtn: IButtonInfo = {
    label: "Switch App",
    area: "settings",
    command: {
      // uses a custom onClick
    },
  };

  const settingsBtn: IButtonInfo = {
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
  };

  return (
    <React.Fragment>
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
