import React from "react";
import "../styles/button.css";
import { ITheme } from "../models/theme";

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
    <React.Fragment>
      <div className="item" id={label}>
        <div className="item-content">
          <div
            className={`button ${buttonClass}`}
            style={buttonStyles}
            onClick={onClick}
          >
            <div>{label}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
