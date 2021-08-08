import * as React from 'react';
import { IGroupInfo } from '../models/groupInfo';
import { Droppable } from 'react-beautiful-dnd';
import '../styles/group.css';

interface IGroupProps {
    groupInfo: IGroupInfo;
    selected?: IGroupInfo;
    focus?: boolean;
    editEnabled: boolean;
    selectGroup: (group: IGroupInfo) => void;
}

export const Group: React.FunctionComponent<IGroupProps> = ({
    groupInfo,
    editEnabled,
    selected,
    focus,
    selectGroup,
    children,
}) => {
    const titleStyle = groupInfo.color ? { color: groupInfo.color } : {};
    const selectedClass = selected?.id === groupInfo.id && editEnabled ? 'selected' : '';
    const focusClass = focus ? 'focus' : '';

    return (
        <div className={`group ${selectedClass} ${focusClass}`}>
            <Droppable droppableId={groupInfo.id.toString()} direction="horizontal">
                {(provided) => (
                    <div
                        className="item-content"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
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
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};
