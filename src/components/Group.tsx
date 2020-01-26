import React from "react";
import { IGroupInfo } from "../models/groupInfo";

export const Group: React.FunctionComponent<IGroupProps> = (
  title,
  { children }
) => {
  //TODO: handle the width in groups
  return (
    <React.Fragment>
      <div className="area-title">{title}</div>
      <div className="area">{children}</div>
    </React.Fragment>
  );
};

interface IGroupProps {
  groupInfo: IGroupInfo;
}
