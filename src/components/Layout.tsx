import React, { useState, useEffect } from "react";
import { ISettings } from "../models/settings";
import { getSettings } from "../api/keySettings";
import { LayoutGenerator } from "./LayoutGenerator";
import "../styles/layout2.css";

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
      <LayoutGenerator settings={settings}></LayoutGenerator>
    </React.Fragment>
  );
};
