import React from "react";
import "../styles/button.css";
import axios from "axios";

interface ButtonProps {
  label: string;
  keys?: string;
  modifiers?: string;
  color?: string;
  onClick: (keys: string, modifiers: string) => void;
}

export const Button = ({ label, keys, modifiers, onClick }: ButtonProps) => {
  const handleClick = () => {
    if (!keys) {
      //TEMP
      onClick("", "");
    }
    const ip = "192.168.7.25:8080";
    const mods = modifiers ? `?modifers=${modifiers}` : "";
    axios.get(`http://${ip}/send/keys/${keys}${mods}`).then(response => {
      onClick(keys || "", mods);
    });
  };

  return (
    <React.Fragment>
      <div className="button" onClick={handleClick}>
        <div>{label}</div>
      </div>
    </React.Fragment>
  );
};
