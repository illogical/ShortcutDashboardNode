import React from "react";
import "../styles/button.css";
import { ITheme } from "../models/theme";
import { GridItem } from "./GridItem";

interface ButtonProps {
  label: string;
  theme?: ITheme;
  borderColor?: string;
  onClick: () => void;
}

export const Button = ({ label, theme, borderColor, onClick }: ButtonProps) => {
  const overrideTheme = theme?.overrideBorderColor;
  const buttonClass = theme?.buttonClass;
  const buttonStyles = !overrideTheme
    ? {}
    : {
        borderColor
      };

  return (
    <GridItem id={label}>
      <div
        className={`button drag ${buttonClass}`}
        style={buttonStyles}
        onClick={onClick}
      >
        <div>{label.toUpperCase()}</div>
      </div>
    </GridItem>
  );
};
