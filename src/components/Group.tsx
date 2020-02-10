import * as React from "react";
import { IGroupInfo } from "../models/groupInfo";

export const Group: React.FunctionComponent<IGroupProps> = ({
  groupInfo,
  children
}) => {
  //TODO: handle the width in groups

  const titleStyle = groupInfo.color ? { color: groupInfo.color } : {};

  return (
    <div className="group">
      <div className="item-content">
        <div className="drag title" style={titleStyle}>
          <span className="far fa-horizontal-rule fa-lg"></span>
          {` ${groupInfo.title.toUpperCase()} `}
          <span className="far fa-horizontal-rule fa-lg"></span>
        </div>
        {children}
      </div>
    </div>
  );
};

interface IGroupProps {
  groupInfo: IGroupInfo;
}
