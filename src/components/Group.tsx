import React from "react";
import { IGroupInfo } from "../models/groupInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHorizontalRule } from "@fortawesome/pro-solid-svg-icons";

export const Group: React.FunctionComponent<IGroupProps> = ({
  groupInfo,
  children
}) => {
  //TODO: handle the width in groups

  const titleStyle = groupInfo.color ? { color: groupInfo.color } : {};

  return (
    <div className="item group">
      <div className="item-content">
        <div className="drag title" style={titleStyle}>
          <FontAwesomeIcon icon={faHorizontalRule} size="lg" />
          {` ${groupInfo.title.toUpperCase()} `}
          <FontAwesomeIcon icon={faHorizontalRule} size="lg" />
        </div>
        {children}
      </div>
    </div>
  );
};

interface IGroupProps {
  groupInfo: IGroupInfo;
}
