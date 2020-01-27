import React from "react";
import { ISettings } from "../models/settings";
import { IButtonInfo } from "../models/buttonInfo";
import { sendKeys } from "../api/keySettings";
import { Button } from "./Button";
import Grid from "./Grid";
import { getTheme, getColorByIndex } from "../helpers/colorSelector";
import { ITheme } from "../models/theme";

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

  return (
    <React.Fragment>
      <div className={`flex ${theme.backgroundClass}`}>
        <div className="pusher"></div>
        <div className="main">
          <Grid>{filterButtonsByArea("main", settings, theme)}</Grid>
        </div>
        <div className="footer">
          <div className="common">
            <div className="common-groups">
              <Grid>{filterButtonsByArea("favorites", settings, theme)}</Grid>
            </div>
            <div className="common-buttons">
              <Grid>{filterButtonsByArea("common", settings, theme)}</Grid>
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
  theme: ITheme
) => {
  return settings.keymap.buttons
    .filter(info => info.area === areaTag)
    .map((buttonInfo, index) =>
      createButton(buttonInfo, theme, settings, index)
    );
};

export const createButton = (
  button: IButtonInfo,
  theme: ITheme,
  settings: ISettings,
  colorIndex: number
) => {
  const handleClick = async () => {
    if (!button.command.keys) return;
    await sendKeys(button.command.keys, button.command.mods);
  };

  const borderColor =
    theme.overrideBorderColor === true
      ? getColorByIndex(colorIndex, settings)
      : "";
  // const borderColor =
  //   theme.overrideBorderColor === true ? getRandomBorderColor(settings) : "";

  return (
    <Button
      key={button.label}
      label={button.label}
      onClick={handleClick}
      borderColor={borderColor}
      theme={theme}
    />
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
