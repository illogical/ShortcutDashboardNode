import * as React from "react";
import { getConfig, saveConfig } from "../api/keySettings";
import { LayoutGenerator } from "./LayoutGenerator";
import "../styles/layout2.css";
import { ReactComponent as Loader } from "../styles/three-dots.svg";
import { IConfig } from "../models/config";

export const Layout = () => {
  const [config, setConfig] = React.useState<IConfig>();

  React.useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await getConfig();
      console.log("Settings:", data);
      setConfig(data);
    };

    // const save = async (config: IConfig) => {
    //   // const configFile: IConfig = remapConfig(config);

    //   await saveConfig(config);
    // };

    fetchSettings();
  }, []);

  //show loader
  if (!config) {
    return (
      <div className={`loader`}>
        <Loader />
      </div>
    );
  }

  return (
    <React.Fragment>
      <LayoutGenerator config={config}></LayoutGenerator>
    </React.Fragment>
  );
};
