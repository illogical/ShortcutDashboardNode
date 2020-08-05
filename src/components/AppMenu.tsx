import React from "react";
import { IEntity } from "../models/entity";

interface AppMenuProps {
  selectedApp: number;
  apps: IEntity[];
  isOpen: boolean;
  close: () => void;
  selectApp: (appId: number) => void;
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
    const selectedClass = app.id === selectedApp ? "selected" : "";
    const appClick = () => selectApp(app.id);

    return (
      <div key={app.id} className={`app ${selectedClass}`} onClick={appClick}>
        {app.name.toUpperCase()}
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
