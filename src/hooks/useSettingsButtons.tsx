import { IButtonInfo } from "../models/buttonInfo";
import React from "react";
import { Button } from "../components/Button";

export const useSettingsButtons = (color: string) => {
  const [, setIsSettingsOpen] = React.useState(false);
  const [forceLabels, setForceLabels] = React.useState(false);

  const toggleForceLabel = () => {
    setForceLabels((x) => !x);
  };

  const toggleSettings = () => {
    setIsSettingsOpen((x) => !x);
  };

  const systemButtonsComponent = (
    <SystemButtons
      color={color}
      forceLabels={forceLabels}
      toggleForceLabel={toggleForceLabel}
      toggleSettings={toggleSettings}
    />
  );

  return [systemButtonsComponent, forceLabels] as const;
};

interface ISystemButtonsProps {
  color: string;
  forceLabels: boolean;
  toggleForceLabel: () => void;
  toggleSettings: () => void;
}

const SystemButtons = ({
  color,
  forceLabels,
  toggleForceLabel,
  toggleSettings,
}: ISystemButtonsProps) => {
  const labelToggleBtn: IButtonInfo = {
    label: "Toggle Icons",
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

  return (
    <React.Fragment>
      <Button
        buttonInfo={labelToggleBtn}
        key={labelToggleBtn.label}
        borderColor={color}
        size="default"
        forceLabel={forceLabels}
        onClick={toggleForceLabel}
      />
      <Button
        buttonInfo={settingsBtn}
        key={settingsBtn.label}
        borderColor={color}
        size="default"
        forceLabel={forceLabels}
        onClick={toggleSettings}
      />
    </React.Fragment>
  );
};
