import React from "react";
import { IGroupInfo } from "../models/groupInfo";

export const Area: React.FunctionComponent<IGroupInfo> = ({
  title,
  children
}) => {
  return (
    <React.Fragment>
      <div className="area-title">{title}</div>
      <div className="area">{children}</div>
    </React.Fragment>
  );
};
