import React from "react";
import { IGroupInfo } from "../models/groupInfo";

export const Group: React.FunctionComponent<IGroupProps> = ({
  groupInfo,
  children
}) => {
  //TODO: handle the width in groups

  const titleStyle = groupInfo.color ? { color: groupInfo.color } : {};

  return (
    <div className="item group" style={titleStyle}>
      <div className="item-content">
        <div className="drag">{groupInfo.title.toUpperCase()}</div>
        {children}
      </div>
    </div>
  );
};

interface IGroupProps {
  groupInfo: IGroupInfo;
}
