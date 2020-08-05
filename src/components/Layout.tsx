import * as React from "react";
import { ISettings } from "../models/settings";
import { getSettings, saveSettings } from "../api/keySettings";
import { LayoutGenerator } from "./LayoutGenerator";
import "../styles/layout2.css";
import { ReactComponent as Loader } from "../styles/three-dots.svg";
import { IConfigFile } from "../models/configFile";
import { remapConfig } from "../helpers/remapConfig";

export const Layout = () => {
  const [settings, setSettings] = React.useState<ISettings>();

  React.useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await getSettings();
      console.log("Settings:", data);
      setSettings(data);
      saveConfig(data);
    };

    const saveConfig = async (settings: ISettings) => {
      const configFile: IConfigFile = remapConfig(settings);

      await saveSettings(configFile);
    };

    fetchSettings();
  }, []);

  //show loader
  if (!settings) {
    return (
      <div className={`loader`}>
        <Loader />
      </div>
    );
  }

  return (
    <React.Fragment>
      <LayoutGenerator settings={settings}></LayoutGenerator>
    </React.Fragment>
  );
};
