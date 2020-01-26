import React from "react";
import { ISettings } from "../models/settings";
import { IKeyMap } from "../models/keymap";
import { Area } from "./Area";
import { IButtonInfo } from "../models/buttonInfo";
import { sendKeys } from "../api/keySettings";
import { Button } from "./Button";

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
      <article className="main">
        <Area title="Main">{filterButtonsByArea("main", settings.keymap)}</Area>
      </article>
      <aside className="aside aside-2">
        <Area title="Most Used">
          {/* TODO: needs to use the count on the buttons */}
          {filterButtonsByArea("most-used", settings.keymap)}
        </Area>
      </aside>
      <footer className="footer">
        <Area title="Favorites">
          {filterButtonsByArea("favorites", settings.keymap)}
        </Area>
        <Area title="Common">
          {filterButtonsByArea("common", settings.keymap)}
        </Area>
      </footer>
    </React.Fragment>
  );
};

const filterButtonsByArea = (areaTag: string, { buttons }: IKeyMap) => {
  return (
    <React.Fragment>
      {buttons
        .filter(info => info.area === areaTag)
        .map(buttonInfo => {
          return createButton(buttonInfo);
        })}
    </React.Fragment>
  );
};

// const getMostUsedButtons = ({ buttons }: IKeyMap) => {
//   return (
//     <React.Fragment>
//       {buttons
//         .sort(info => info.count)
//         .map(buttonInfo => {
//           return createButton(buttonInfo);
//         })}
//     </React.Fragment>
//   );
// }

const createButton = (button: IButtonInfo) => {
  const handleClick = async () => {
    if (!button.command.keys || !button.command.mods) return;
    await sendKeys(button.command.keys, button.command.mods);
  };

  return <Button label={button.label} onClick={handleClick} />;

  //return <Button />;
};

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
