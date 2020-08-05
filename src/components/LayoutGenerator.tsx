import * as React from "react";
import { ColorSelector } from "../helpers/colorSelector";
import { Grid } from "./Grid";
import { useSettingsButtons } from "../hooks/useSettingsButtons";
import { createButton } from "../helpers/generators";
import { useButtonHistory } from "../hooks/useButtonHistory";
import { Area } from "./Area";
import { Filters } from "./Filters";
import { IConfig } from "../models/config";

interface ILayoutGeneratorProps {
  config: IConfig;
}

export const LayoutGenerator = ({ config }: ILayoutGeneratorProps) => {
  const [filter, setFilter] = React.useState<number>(-1);

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
  ] = useSettingsButtons(config.apps, colorSelector.getColor());
  const [generateButtonHistory, addButtonToHistory] = useButtonHistory(
    forceLabels
  );

  // TODO: otherwise check if group tags or button tags match any selected tags
  // const allFiltersEnable = settings.filters.length === selectedTags.length;   // TODO: when this is enabled, ignore filters

  return (
    <div className="dashboard">
      {applicationMenu}
      <div className="flex-vertical">
        <div className="flex flex-main">
          <div className="applications">
            {/* <ApplicationFilters
            applications={settings.applications}
            selected={selectedApp}
            onSelect={setSelectedApp}
          /> */}
          </div>
          <div className="filters">
            <Filters
              filters={config.filters}
              selectedFilter={filter}
              selectFilter={setFilter}
            />
          </div>
          <div className="top">
            <Area
              app={selectedApp}
              area="top"
              groups={config.groups}
              buttons={config.buttons}
              filter={filter}
              colorSelector={colorSelector}
              forceLabels={forceLabels}
              addButton={addButtonToHistory}
            />
          </div>
          <div className="pusher"></div>
          <div className="main">
            <Grid>
              <Area
                app={selectedApp}
                area="main"
                groups={config.groups}
                buttons={config.buttons}
                filter={filter}
                colorSelector={colorSelector}
                forceLabels={forceLabels}
                addButton={addButtonToHistory}
              />
            </Grid>
          </div>
          <div className="footer">
            <div className="common">
              <div className="common-groups">
                <Grid>
                  <Area
                    app={selectedApp}
                    area="favorites"
                    groups={config.groups}
                    buttons={config.buttons}
                    filter={filter}
                    colorSelector={colorSelector}
                    forceLabels={forceLabels}
                    addButton={addButtonToHistory}
                  />
                </Grid>
              </div>
              <div className="common-buttons">
                <Grid>
                  <Area
                    app={selectedApp}
                    area="common"
                    groups={config.groups}
                    buttons={config.buttons}
                    filter={filter}
                    colorSelector={colorSelector}
                    forceLabels={forceLabels}
                    addButton={addButtonToHistory}
                  />
                </Grid>
              </div>
            </div>
          </div>
        </div>
        <div className="right-side right-split">
          <div className="recent">
            <div className="title centered">RECENT</div>
            {generateButtonHistory()}
          </div>
          <div className="settings">{systemButtons}</div>
        </div>
      </div>
    </div>
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

export default createButton;

/*

edit OR object via tags
		
sculpt just shows/hides sculpt group
	
add groups to favorites (rename from favorites?)
	
don't forget to throw out empty groups (all could be hidden via tag filter)

*/
