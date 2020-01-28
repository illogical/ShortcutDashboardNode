import React from "react";
import { ISettings } from "../models/settings";
import { IButtonInfo } from "../models/buttonInfo";
import { sendKeys } from "../api/keySettings";
import { Button } from "./Button";
import Grid from "./Grid";
import { getTheme, ColorSelector } from "../helpers/colorSelector";
import { ITheme } from "../models/theme";
import { IGroupInfo } from "../models/groupInfo";
import { Group } from "./Group";

export const LayoutGenerator = ({ settings }: ILayoutGeneratorProps) => {
  return (
    <React.Fragment>
      {settings ? generateLayout(settings) : <h2>Generating Layout...</h2>}
    </React.Fragment>
  );
};

interface ILayoutGeneratorProps {
  settings?: ISettings;
}

const generateLayout = (settings: ISettings) => {
  const theme = getTheme();
  const colorSelector = new ColorSelector(settings.colors.buttons); //use this for groups and buttons

  return (
    <React.Fragment>
      <div className={`flex ${theme.backgroundClass}`}>
        <div className="pusher"></div>
        <div className="main">
          <Grid>
            {createArea(
              "main",
              settings.groups,
              settings.keymap.buttons,
              theme,
              colorSelector
            )}
          </Grid>
        </div>
        <div className="footer">
          <div className="common">
            <div className="common-groups">
              <Grid>
                {createArea(
                  "favorites",
                  settings.groups,
                  settings.keymap.buttons,
                  theme,
                  colorSelector
                )}
                }
                {/* {filterButtonsByArea(
                  "favorites",
                  settings,
                  theme,
                  colorSelector.getColor()
                )} */}
              </Grid>
            </div>
            <div className="common-buttons">
              <Grid>
                {createArea(
                  "common",
                  settings.groups,
                  settings.keymap.buttons,
                  theme,
                  colorSelector
                )}
                {/* {filterButtonsByArea(
                  "common",
                  settings,
                  theme,
                  colorSelector.getColor()
                )} */}
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const filterButtonsByArea = (
  areaTag: string,
  settings: ISettings,
  theme: ITheme,
  color: string
) => {
  return settings.keymap.buttons
    .filter(info => info.area === areaTag)
    .map(buttonInfo => createButton(buttonInfo, theme, color));
};

export const createButton = (
  button: IButtonInfo,
  theme: ITheme,
  colorOverride?: string
) => {
  const handleClick = async () => {
    if (!button.command.keys) return;
    try {
      //TODO: change button borderColor to green
      await sendKeys(button.command.keys, button.command.mods);
    } catch (error) {
      //TODO: change button borderColor to red
    }
  };

  const themeOverride = theme.overrideBorderColor === true ? colorOverride : "";

  return (
    <Button
      key={button.label}
      label={button.label}
      onClick={handleClick}
      borderColor={themeOverride}
      theme={theme}
    />
  );
};

export const createGroup = (
  group: IGroupInfo,
  buttons: IButtonInfo[], //pass all buttons
  theme: ITheme,
  colorSelector: ColorSelector
) => {
  const groupColor = colorSelector.getColor();
  group.color = groupColor;

  return (
    <React.Fragment>
      {buttons
        .filter(btn => btn.tags?.indexOf(group.tag))
        .map(btnInfo => createButton(btnInfo, theme, groupColor))}
    </React.Fragment>
  );

  // <Group key={group.title} groupInfo={group}>

  // </Group>
};

export const createArea = (
  area: string,
  groups: IGroupInfo[], //pass all groups
  buttons: IButtonInfo[], //pass all buttons
  theme: ITheme,
  colorSelector: ColorSelector
) => {
  const untaggedButtonColor = colorSelector.getColor();

  const untaggedButtons = buttons
    .filter(btn => btn.area === area && !btn.tags) // get untagged buttons
    .map(btnInfo => createButton(btnInfo, theme, untaggedButtonColor));

  const groupsByArea = groups
    .filter(grp => grp.area === area)
    .map(grp =>
      createGroup(
        grp,
        buttons.filter(btn => btn.tags?.indexOf(grp.tag)),
        theme,
        colorSelector
      )
    );

  return [...untaggedButtons, ...groupsByArea];
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
