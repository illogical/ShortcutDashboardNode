import React from "react";
import { IGroupInfo } from "../models/groupInfo";

export const Group: React.FunctionComponent<IGroupProps> = ({
  groupInfo,
  children
}) => {
  //TODO: handle the width in groups

  const titleStyle = groupInfo.color ? { color: groupInfo.color } : {};

  return (
    <React.Fragment>
      <div className="area-title" style={titleStyle}>
        {groupInfo.title}
      </div>
      <div className="area">{children}</div>
    </React.Fragment>
  );
};

interface IGroupProps {
  groupInfo: IGroupInfo;
}
