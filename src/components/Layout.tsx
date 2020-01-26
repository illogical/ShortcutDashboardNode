import React, { useState, useEffect } from "react";
import { ISettings } from "../models/settings";
import { getSettings } from "../api/keySettings";
import { LayoutGenerator } from "./LayoutGenerator";

export const Layout = () => {
  const [settings, setSettings] = useState<ISettings>();

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await getSettings();
      console.log("Data:", data);
      setSettings(data);
    };

    fetchSettings();
  }, []);

  return (
    <React.Fragment>
      <div className="wrapper">
        <header className="header">HEADER</header>
        <LayoutGenerator settings={settings}></LayoutGenerator>
      </div>
    </React.Fragment>
  );
};
