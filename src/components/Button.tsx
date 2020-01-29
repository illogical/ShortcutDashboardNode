import React from "react";
import "../styles/button.css";
import { ITheme } from "../models/theme";
import { GridItem } from "./GridItem";

interface ButtonProps {
  label: string;
  theme?: ITheme;
  loading?: boolean;
  borderColor?: string;
  onClick: () => void;
}

export const Button = ({
  label,
  theme,
  borderColor,
  loading,
  onClick
}: ButtonProps) => {
  const overrideTheme = theme?.overrideBorderColor;
  const buttonClass = theme?.buttonClass;
  const buttonStyles = !overrideTheme
    ? {}
    : {
        borderColor
      };

  const singleLetterLabelClass = label.length === 1 ? "letter" : "";
  const loadingClass = loading || "";

  return (
    <GridItem id={label}>
      <div
        className={`button drag ${buttonClass} ${singleLetterLabelClass} ${loadingClass}`}
        style={buttonStyles}
        onClick={onClick}
      >
        <div>{label.toUpperCase()}</div>
      </div>
    </GridItem>
  );
};
