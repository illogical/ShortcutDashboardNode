import React from "react";

interface AppMenuProps {
  selectedApp: string;
  apps: string[];
  isOpen: boolean;
  close: () => void;
  selectApp: (applicationName: string) => void;
}

export const AppMenu = ({
  apps,
  selectedApp,
  isOpen,
  close,
  selectApp,
}: AppMenuProps) => {
  const openClass = isOpen ? "open" : "";

  const appsDisplay = apps.map((app) => {
    const selectedClass = app === selectedApp ? "selected" : "";
    const appClick = () => selectApp(app);

    return (
      <div key={app} className={`app ${selectedClass}`} onClick={appClick}>
        {app.toUpperCase()}
      </div>
    );
  });

  return (
    <div className={`panel-wrap ${openClass}`}>
      <div className="panel">
        <div className="close-icon" onClick={close}>
          <i className="fad fa-sign-out-alt fa-2x"></i>
        </div>
        <div className="title panel-title">APPLICATION PROFILES</div>
        <div>{appsDisplay}</div>
      </div>
    </div>
  );
};
