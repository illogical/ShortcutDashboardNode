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
      setConfig({
        ...data,
        areas: ["main", "top", "bottom", "common"],
      });
    };

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

  const updateConfig = async (updatedConfig: IConfig) => {
    try {
      // await saveConfig(updatedConfig);
      setConfig(updatedConfig);
    } catch (error) {
      console.error("Failed to save config.");
    }
  };

  return (
    <React.Fragment>
      <LayoutGenerator
        config={config}
        saveConfig={updateConfig}
      ></LayoutGenerator>
    </React.Fragment>
  );
};
