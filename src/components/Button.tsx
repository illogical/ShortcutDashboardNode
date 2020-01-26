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
    onClick(keys || "", modifiers || "");
  };

  return (
    <React.Fragment>
      <div className="button" onClick={handleClick}>
        <div>{label}</div>
      </div>
    </React.Fragment>
  );
};
