import React from "react";
import { ISettings } from "../models/settings";
import { IKeyMap } from "../models/keymap";
import { IButtonInfo } from "../models/buttonInfo";
import { sendKeys } from "../api/keySettings";
import { Button } from "./Button";
import Grid from "./Grid";

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
  //TODO: color randomizer

  return (
    <React.Fragment>
      <div className="flex">
        <div className="pusher"></div>
        <div className="main">
          <Grid>{filterButtonsByArea("main", settings.keymap)}</Grid>
        </div>
        <div className="footer">
          <div className="common">
            <div className="common-groups">
              <Grid>{filterButtonsByArea("favorites", settings.keymap)}</Grid>
            </div>
            <div className="common-buttons">
              <Grid>{filterButtonsByArea("common", settings.keymap)}</Grid>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const filterButtonsByArea = (areaTag: string, { buttons }: IKeyMap) => {
  return buttons
    .filter(info => info.area === areaTag)
    .map(buttonInfo => createButton(buttonInfo));
};

export const createButton = (button: IButtonInfo) => {
  const handleClick = async () => {
    if (!button.command.keys) return;
    await sendKeys(button.command.keys, button.command.mods);
  };

  return (
    <Button
      key={button.label}
      label={button.label}
      onClick={handleClick}
      keys={button.command.keys}
      modifiers={button.command.mods}
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
