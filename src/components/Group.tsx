import * as React from "react";
import { IGroupInfo } from "../models/groupInfo";
import { Droppable } from "react-beautiful-dnd";

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
      {/* <Droppable droppableId={groupInfo.id.toString()}>
        {(provided) => ( */}
      <div
        className="item-content"
        // ref={provided.innerRef}
        // {...provided.droppableProps}
      >
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
      {/* )}
      </Droppable> */}
    </div>
  );
};

interface IGroupProps {
  groupInfo: IGroupInfo;
  selected?: IGroupInfo;
  editEnabled: boolean;
  selectGroup: (group: IGroupInfo) => void;
}
