import * as React from "react";
import { IGroupInfo } from "../models/groupInfo";

export const Group: React.FunctionComponent<IGroupProps> = ({
  groupInfo,
  editEnabled,
  selected,
  selectGroup,
  children,
}) => {
  const titleStyle = groupInfo.color ? { color: groupInfo.color } : {};
  const selectedClass =
    selected?.id === groupInfo.id && editEnabled ? "selected" : "";

  return (
    <div className={`group ${selectedClass}`}>
      <div className="item-content">
        <div
          className="drag title"
          style={titleStyle}
          onClick={() => selectGroup(groupInfo)}
        >
          <span className="far fa-horizontal-rule fa-lg"></span>
          {` ${groupInfo.name.toUpperCase()} `}
          <span className="far fa-horizontal-rule fa-lg"></span>
        </div>
        {children}
      </div>
    </div>
  );
};

interface IGroupProps {
  groupInfo: IGroupInfo;
  selected?: IGroupInfo;
  editEnabled: boolean;
  selectGroup: (group: IGroupInfo) => void;
}
