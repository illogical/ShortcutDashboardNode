import React from "react";
import { ISettings } from "../models/settings";
import { IButtonInfo } from "../models/buttonInfo";
import { Button } from "./Button";
import Grid from "./Grid";
import { getTheme, ColorSelector } from "../helpers/colorSelector";
import { ITheme } from "../models/theme";
import { IGroupInfo } from "../models/groupInfo";
import { Group } from "./Group";
import { ReactComponent as Loader } from "../styles/three-dots.svg";

export const LayoutGenerator = ({ settings }: ILayoutGeneratorProps) => {
  return <React.Fragment>{generateLayout(settings)}</React.Fragment>;
};

interface ILayoutGeneratorProps {
  settings?: ISettings;
}

const generateLayout = (settings?: ISettings) => {
  const theme = getTheme();
  if (!settings) {
    return (
      <div className={`loader ${theme.backgroundClass}`}>
        <Loader />
      </div>
    );
  }

  const colorSelector = new ColorSelector(
    settings.colors.buttons
    //faker.random.number()
  ); //use this for groups and buttons

  return (
    <React.Fragment>
      <div className={`flex ${theme.backgroundClass}`}>
        <div className="top">
          {createArea(
            "top",
            settings.groups,
            settings.keymap.buttons,
            theme,
            colorSelector
          )}
        </div>
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
              </Grid>
            </div>
            <div className="common-buttons">
              <Grid>
                {createArea(
                  "common",
                  settings.groups.reverse(),
                  settings.keymap.buttons,
                  theme,
                  colorSelector
                )}
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export const createButton = (
  button: IButtonInfo,
  theme: ITheme,
  colorOverride?: string
) => {
  const themeOverride = theme.overrideBorderColor === true ? colorOverride : "";

  return (
    <Button
      buttonInfo={button}
      key={button.label}
      borderColor={themeOverride}
      theme={theme}
      size={button.size ? button.size : "default"}
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

  const filteredButtons = buttons.filter(btn => {
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
      {filteredButtons.map(btnInfo => {
        return createButton(btnInfo, theme, groupColor);
      })}
    </Group>
  );
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
    .map(grp => createGroup(grp, buttons, theme, colorSelector));

  return [...groupsByArea, ...untaggedButtons];
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
