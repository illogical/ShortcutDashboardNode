import * as React from "react";
import { ISettings } from "../models/settings";
import { getSettings } from "../api/keySettings";
import { LayoutGenerator } from "./LayoutGenerator";
import "../styles/layout2.css";
import { ReactComponent as Loader } from "../styles/three-dots.svg";

export const Layout = () => {
  const [settings, setSettings] = React.useState<ISettings>();

  React.useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await getSettings();
      console.log("Settings:", data);
      setSettings(data);
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
    <div className={`flex`}>
      <LayoutGenerator settings={settings}></LayoutGenerator>
    </div>
  );
};
