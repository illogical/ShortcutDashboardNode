import * as React from "react";
import { ColorSelector } from "../helpers/colorSelector";
import { Grid } from "./Grid";
import { useSettingsButtons } from "../hooks/useSettingsButtons";
import { useButtonHistory } from "../hooks/useButtonHistory";
import { Area } from "./Area";
import { Filters } from "./Filters";
import { IConfig } from "../models/config";
import { useEditMode } from "../hooks/useEditMode";
import { useState } from "react";
import { IButtonInfo } from "../models/buttonInfo";
import { IGroupInfo } from "../models/groupInfo";
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
  DragUpdate,
} from "react-beautiful-dnd";

interface ILayoutGeneratorProps {
  config: IConfig;
  saveConfig: (saveConfig: IConfig) => void;
}

export const LayoutGenerator = ({
  config,
  saveConfig,
}: ILayoutGeneratorProps) => {
  const [filter, setFilter] = useState<number>(-1);
  const [selectedButton, setSelectedButton] = useState<
    IButtonInfo | undefined
  >();
  const [selectedGroup, setSelectedGroup] = useState<IGroupInfo | undefined>();
  const [editEnabled, setEditEnabled] = useState(false);

  const colorSelector = new ColorSelector(
    config.settings.colors.options
    //faker.random.number()
  ); //use this for groups and buttons

  // custom hooks
  const [
    systemButtons,
    applicationMenu,
    forceLabels,
    selectedApp,
  ] = useSettingsButtons(config.apps, colorSelector.getColor(), () =>
    setEditEnabled(true)
  );
  const [generateButtonHistory, addButtonToHistory] = useButtonHistory(
    forceLabels
  );

  const [editButtonPanelComponent] = useEditMode(
    config,
    selectedButton,
    saveConfig,
    () => setEditEnabled(false)
  );
  const hideClass = "hide";
  const editClass = editEnabled ? "edit-mode" : "";
  const buttonClick = editEnabled ? setSelectedButton : addButtonToHistory;

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
    groups: config.groups,
    buttons: config.buttons,
    filter,
    colorSelector,
    editEnabled,
    forceLabels,
    selectedGroup,
    onClick: buttonClick,
    selectGroup: setSelectedGroup,
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
      <div className={`dashboard ${editClass}`}>
        {applicationMenu}
        <div className="flex-vertical">
          <div className="flex flex-main">
            <div className="applications"></div>
            <div className="filters">
              <Filters
                filters={config.filters}
                selectedFilter={filter}
                selectFilter={setFilter}
              />
            </div>
            <div className="top">
              <Area app={selectedApp} area="top" {...areaProps} />
            </div>
            <div className="pusher"></div>
            <div className="main">
              <Grid>
                <Area app={selectedApp} area="main" {...areaProps} />
              </Grid>
            </div>
            <div className="footer">
              <div className="common">
                <div className="common-groups">
                  <Grid>
                    <Area app={selectedApp} area="favorites" {...areaProps} />
                  </Grid>
                </div>
                <div className="common-buttons">
                  <Grid>
                    <Area app={selectedApp} area="common" {...areaProps} />
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
  applications: string[];
  selected: string;
  onSelect: (app: string) => void;
}

const ApplicationFilters = ({
  applications,
  selected,
  onSelect,
}: IApplicationFilters) => {
  return (
    <React.Fragment>
      {applications.map((app) => {
        const handleClick = () => {
          onSelect(app);
        };

        return (
          <span
            onClick={handleClick}
            className={`app-item ${selected === app ? "selected" : ""}`}
          >
            {app.toUpperCase()}
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
