import React from "react";
import "../styles/editPanelHeader.css";

export const EditPanelHeader = ({
  panelTitle,
  onClose,
}: IEditPanelHeaderProps) => {
  return (
    <div className="panel-header">
      <div className="horizontal">
        <div>
          <i className="fad fa-times-circle fa-2x icon" onClick={onClose}></i>
        </div>
        <div className="title">{panelTitle}</div>
        <div>
          <i className="fad fa-plus-circle fa-2x icon"></i>
        </div>
      </div>
    </div>
  );
};

interface IEditPanelHeaderProps {
  panelTitle: string;
  onClose: () => void;
}
