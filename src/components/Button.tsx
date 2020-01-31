import React, { useState } from "react";
import "../styles/button.css";
import { ITheme } from "../models/theme";
import { GridItem } from "./GridItem";
import { sendKeys } from "../api/keySettings";
import { IButtonInfo } from "../models/buttonInfo";
import { motion } from "framer-motion";

interface ButtonProps {
  buttonInfo: IButtonInfo;
  theme?: ITheme;
  loading?: boolean;
  borderColor?: string;
  size: "default" | "medium" | "large";
  onClick?: () => void;
}

export const Button = ({
  buttonInfo,
  theme,
  borderColor,
  size,
  onClick
}: ButtonProps) => {
  const [loading, setLoading] = useState(false);
  const overrideTheme = theme?.overrideBorderColor;
  const loadingClass = loading ? "loading" : "";
  const buttonStyles =
    !overrideTheme || loading
      ? {}
      : {
          borderColor
        };

  const singleLetterLabelClass = buttonInfo.label.length === 1 ? "letter" : "";

  const handleClick = async () => {
    if (!buttonInfo.command.keys) return;
    try {
      //TODO: change button borderColor to green
      setLoading(true);
      await sendKeys(buttonInfo.command.keys, buttonInfo.command.mods);
      setLoading(false);
    } catch (error) {
      //TODO: change button borderColor to red
      setLoading(false);
    }
  };

  return (
    <GridItem id={buttonInfo.label}>
      <motion.div
        className={`button drag ${singleLetterLabelClass} ${loadingClass} ${size}`}
        style={buttonStyles}
        onTap={onClick || handleClick}
        whileTap={{ scale: 0.85 }}
        transition={{ type: "spring", stiffness: 130 }}
      >
        <div>{buttonInfo.label.toUpperCase()}</div>
      </motion.div>
    </GridItem>
  );
};
