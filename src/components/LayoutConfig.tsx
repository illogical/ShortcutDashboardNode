import * as React from 'react';
import { ColorSelector } from '../helpers/colorSelector';
import { Grid } from './Grid';
import { useSettingsButtons } from '../hooks/useSettingsButtons';
import { useButtonHistory } from '../hooks/useButtonHistory';
import { Area } from './Area';
import { Area as AreaEnum } from '../models/enums';
import { Filters } from './Filters';
import { IConfig } from '../models/config';
import { useEditMode } from '../hooks/useEditMode';
import { useState } from 'react';
import { IButtonInfo } from '../models/buttonInfo';
import { IGroupInfo } from '../models/groupInfo';
import { DragDropContext, DropResult, ResponderProvided, DragUpdate } from 'react-beautiful-dnd';
import { ILayout } from '../models/layout';

interface ILayoutConfigProps {
    config: IConfig;
    saveConfig: (saveConfig: IConfig) => void;
}

export const LayoutConfig = ({ config, saveConfig }: ILayoutConfigProps) => {
    const [filter, setFilter] = useState<number>(-1);
    const [selectedButton, setSelectedButton] = useState<IButtonInfo | undefined>();
    const [selectedGroup, setSelectedGroup] = useState<IGroupInfo | undefined>();
    const [editEnabled, setEditEnabled] = useState(false);
    const [previewConfig, setPreviewConfig] = useState<IConfig>(config);

    const colorSelector = new ColorSelector(
        config.settings.colors.options
        //faker.random.number()
    ); //use this for groups and buttons

    // custom hooks
    const [systemButtons, applicationMenu, forceLabels, selectedLayout, selectLayout] =
        useSettingsButtons(config.layouts, colorSelector.getColor(), () => setEditEnabled(true));
    const [generateButtonHistory, addButtonToHistory] = useButtonHistory(forceLabels);

    // TODO: show edits while they are being made (not just during saveConfig)
    const [editButtonPanelComponent, focusedGroupId] = useEditMode(
        config,
        selectedButton,
        selectedGroup,
        saveConfig,
        setPreviewConfig,
        setSelectedButton,
        setSelectedGroup,
        () => setEditEnabled(false)
    );

    const handleSelectButton = (buttonInfo: IButtonInfo) => {
        const group = config.groups.find((g) => g.id === buttonInfo.groupId);
        // sets the button groupId based upon its group
        setSelectedButton({ ...buttonInfo, groupId: group ? group.id : undefined });
        setSelectedGroup(undefined);
    };

    const handleSelectGroup = (group: IGroupInfo) => {
        setSelectedGroup(group);
        setSelectedButton(undefined);
    };

    const hideClass = 'hide';
    const editClass = editEnabled ? 'edit-mode' : '';
    const buttonClick = editEnabled ? handleSelectButton : addButtonToHistory;

    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
        // result.destination.droppableId
        // result.destination.index
        // TODO: look up group
        // TODO: add button to group and remove it from its current group
    };

    const onDragUpdate = (result: DragUpdate, provided: ResponderProvided) => {
        // TODO: check which group is hovered over to highlight it
        // TODO: how to move buttons out of the way?
    };

    const areaProps = {
        groups: previewConfig.groups,
        buttons: previewConfig.buttons,
        appSettings: config.appSettings,
        layout: selectedLayout,
        filter,
        colorSelector,
        editEnabled,
        forceLabels,
        selectedGroup,
        focusedGroupId,
        onClick: buttonClick,
        selectGroup: handleSelectGroup,
    };

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
            <div className={`dashboard ${editClass}`}>
                {applicationMenu}
                <div className="flex-vertical">
                    <div className="flex flex-main">
                        <div className="layouts">
                            <LayoutFilters
                                layouts={config.layouts}
                                selected={selectedLayout}
                                onSelect={selectLayout}
                            />
                        </div>
                        {/* <div className="filters">
                            <Filters
                                filters={config.filters}
                                selectedFilter={filter}
                                selectFilter={setFilter}
                            />
                        </div> */}
                        <div className="top">
                            <Area area={AreaEnum.Top} {...areaProps} />
                        </div>
                        <div className="pusher"></div>
                        <div className="main">
                            <Grid>
                                <Area area={AreaEnum.Main} {...areaProps} />
                            </Grid>
                        </div>
                        <div className="footer">
                            <div className="common">
                                <div className="common-groups">
                                    <Grid>
                                        <Area area={AreaEnum.Bottom} {...areaProps} />
                                    </Grid>
                                </div>
                                <div className="common-buttons">
                                    <Grid>
                                        <Area area={AreaEnum.Common} {...areaProps} />
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`right-side right-split ${editEnabled && hideClass}`}>
                        <div className="recent">
                            <div className="title centered">RECENT</div>
                            {generateButtonHistory()}
                        </div>
                        <div className="settings">{systemButtons}</div>
                    </div>
                    <div className={`right-side edit-panel ${!editEnabled && hideClass}`}>
                        {editButtonPanelComponent}
                    </div>
                </div>
            </div>
        </DragDropContext>
    );
};

interface IApplicationFilters {
    layouts: ILayout[];
    selected: ILayout;
    onSelect: (layout: ILayout) => void;
}

const LayoutFilters = ({ layouts, selected, onSelect }: IApplicationFilters) => {
    return (
        <React.Fragment>
            {layouts.map((layout) => {
                const handleClick = () => {
                    onSelect(layout);
                };

                return (
                    <span
                        onClick={handleClick}
                        className={`app-item ${selected.name === layout.name ? 'selected' : ''}`}
                    >
                        {layout.name.toUpperCase()}
                    </span>
                );
            })}
        </React.Fragment>
    );
};

/*

edit OR object via tags
		
sculpt just shows/hides sculpt group
	
add groups to favorites (rename from favorites?)
	
don't forget to throw out empty groups (all could be hidden via tag filter)

*/
