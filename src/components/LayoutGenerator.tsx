import * as React from "react";
import { ISettings } from "../models/settings";
import { IButtonInfo } from "../models/buttonInfo";
import { Button } from "./Button";
import { ColorSelector } from "../helpers/colorSelector";
import { IGroupInfo } from "../models/groupInfo";
import { Group } from "./Group";
import { Grid } from "./Grid";
import * as lodash from "lodash";

export const LayoutGenerator = ({ settings }: ILayoutGeneratorProps) => {
  return (
    <React.Fragment>
      <GenerateLayout settings={settings} />
    </React.Fragment>
  );
};

interface ILayoutGeneratorProps {
  settings: ISettings;
}

const GenerateLayout = ({ settings }: ILayoutGeneratorProps) => {
  const [selectedApp, setSelectedApp] = React.useState(
    settings ? settings.applications[0] : "blender"
  );
  const [, setIsSettingsOpen] = React.useState(false);
  const [buttonHistory, setButtonHistory] = React.useState<
    Record<string, IButtonInfo>
  >({});
  const [forceLabels, setForceLabels] = React.useState(false);

  const addButtonToHistory = (buttonInfo: IButtonInfo) => {
    setButtonHistory((x) => {
      // update lastUsed for this buttonupdatedHistory
      const updatedHistory = {
        ...x,
        [buttonInfo.label]: {
          ...buttonInfo,
          lastUsed: new Date(),
          size: undefined,
        },
      };

      return updatedHistory;
    });
  };

  const toggleForceLabel = () => {
    setForceLabels((x) => !x);
  };

  const toggleSettings = () => {
    setIsSettingsOpen((x) => !x);
  };

  const generateButtonHistory = () => {
    const buttons = Object.values(buttonHistory);
    const sortedButtons = lodash.sortBy(buttons, "lastUsed").reverse();
    return sortedButtons.map((button) => {
      return createButton(button, forceLabels, addButtonToHistory);
    });
  };

  const handleSelectApp = (app: string) => {
    setSelectedApp(app);
  };

  const colorSelector = new ColorSelector(
    settings.colors.buttons
    //faker.random.number()
  ); //use this for groups and buttons

  const systemButtons = createSystemButtons(
    colorSelector,
    forceLabels,
    toggleSettings,
    toggleForceLabel
  );

  return (
    <div className="flex-vertical">
      <div className="flex flex-main">
        <div className="applications">
          <ApplicationFilters
            applications={settings.applications}
            selected={selectedApp}
            onSelect={handleSelectApp}
          />
        </div>
        <div className="top">
          <Area
            app={selectedApp}
            area="top"
            groups={settings.groups}
            buttons={settings.keymap.buttons}
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
              groups={settings.groups}
              buttons={settings.keymap.buttons}
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
                  groups={settings.groups}
                  buttons={settings.keymap.buttons}
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
                  groups={settings.groups}
                  buttons={settings.keymap.buttons}
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
  );
};

const createSystemButtons = (
  colorSelector: ColorSelector,
  forceLabels: boolean,
  toggleSettings: () => void,
  toggleForceLabel: () => void
) => {
  const color = colorSelector.getColor();

  const labelToggleBtn: IButtonInfo = {
    label: "Toggle Labels",
    area: "settings",
    command: {
      // uses a custom onClick
    },
  };

  const settingsBtn: IButtonInfo = {
    label: "Settings",
    area: "settings",
    icon: "fad fa-cog fa-3x",
    command: {
      // uses a custom onClick
    },
  };

  return (
    <React.Fragment>
      <Button
        buttonInfo={labelToggleBtn}
        key={labelToggleBtn.label}
        borderColor={color}
        size="default"
        forceLabel={forceLabels}
        onClick={toggleForceLabel}
      />
      <Button
        buttonInfo={settingsBtn}
        key={settingsBtn.label}
        borderColor={color}
        size="default"
        forceLabel={forceLabels}
        onClick={toggleSettings}
      />
    </React.Fragment>
  );
};

export const createButton = (
  button: IButtonInfo,
  forceLabels: boolean,
  addButton: (buttonInfo: IButtonInfo) => void,
  colorOverride?: string
) => {
  return (
    <Button
      buttonInfo={button}
      key={button.label}
      borderColor={colorOverride}
      size={button.size ? button.size : "default"}
      forceLabel={forceLabels}
      onClick={addButton}
    />
  );
};

export const createGroup = (
  group: IGroupInfo,
  buttons: IButtonInfo[], //pass all buttons
  colorSelector: ColorSelector,
  forceLabels: boolean,
  addButton: (buttonInfo: IButtonInfo) => void
) => {
  const groupColor = colorSelector.getColor();
  group.color = groupColor;

  const filteredButtons = buttons.filter((btn) => {
    if (!btn.tags) return false;
    return btn.tags?.indexOf(group.tag) >= 0;
  });

  //stretch buttons across bottom of groups
  switch (filteredButtons.length % 3) {
    case 2:
      filteredButtons[filteredButtons.length - 1].size = "medium";
      filteredButtons[filteredButtons.length - 2].size = "medium";
      break;
    case 1:
      filteredButtons[filteredButtons.length - 1].size = "large";
      break;
  }

  return (
    <Group key={group.title} groupInfo={group}>
      {filteredButtons.map((btnInfo) =>
        createButton(btnInfo, forceLabels, addButton, groupColor)
      )}
    </Group>
  );
};

interface AreaProps {
  app: string;
  area: string;
  groups: IGroupInfo[]; //pass all groups
  buttons: IButtonInfo[]; //pass all buttons
  colorSelector: ColorSelector;
  forceLabels: boolean;
  addButton: (buttonInfo: IButtonInfo) => void;
}

export const Area = ({
  app,
  area,
  groups,
  buttons,
  colorSelector,
  forceLabels,
  addButton,
}: AreaProps) => {
  const untaggedButtonColor = colorSelector.getColor();

  const untaggedButtons = buttons
    .filter(
      (btn) =>
        (btn.app === "all" || btn.app === app) && btn.area === area && !btn.tags
    ) // get untagged buttons
    .map((btnInfo) =>
      createButton(btnInfo, forceLabels, addButton, untaggedButtonColor)
    );

  const groupsByArea = groups
    .filter(
      (grp) => (grp.app === "all" || grp.app === app) && grp.area === area
    )
    .map((grp) =>
      createGroup(grp, buttons, colorSelector, forceLabels, addButton)
    );

  return (
    <React.Fragment>{[...groupsByArea, ...untaggedButtons]}</React.Fragment>
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

	* check python
	* 
filter out icons by tag
		* 
edit OR object
		* 
sculpt just shows/hides sculpt group
	* 
check common
	* 
build groups
	* 
add untagged to main
	* 
add groups to main
	* 
add groups to favorites (rename from favorites?)
	* 
add recent
	* 
don't forget to throw out empty groups (all could be hidden via tag filter)


*/

//convert settings into a layout
