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
  const [loadingClass, setLoadingClass] = useState("");
  const overrideTheme = theme?.overrideBorderColor;

  const handleClick = async () => {
    if (!buttonInfo.command.keys) return;
    try {
      setLoadingClass("loading");
      await sendKeys(buttonInfo.command.keys, buttonInfo.command.mods);
      setLoadingClass("");
    } catch (error) {
      setLoadingClass("fail");
    }
  };

  //sets fontawesome's duotone icon secondary color
  let buttonStyles: any = {
    "--fa-primary-color": "#6dbef5",
    "--fa-secondary-color": "#ffbed4"
  };
  //changes button color while waiting for server response
  buttonStyles =
    !overrideTheme || loadingClass === "loading"
      ? buttonStyles
      : {
          ...buttonStyles,
          borderColor
        };

  //X,Y,Z
  const singleLetterLabelClass = buttonInfo.label.length === 1 && "letter";

  //animation
  const variants = {
    push: {
      scale: 0.85,
      transition: { type: "spring", damping: 6, stiffness: 160 }
    }
  };

  return (
    <GridItem id={buttonInfo.label}>
      <motion.div
        className={`button drag ${singleLetterLabelClass} ${loadingClass} ${size}`}
        style={buttonStyles}
        onTap={onClick || handleClick}
        whileTap={"push"}
        variants={variants}
      >
        {buttonInfo.icon ? (
          <div>
            <span className={buttonInfo.icon} />
            <span className="hidden">{buttonInfo.label.toUpperCase()}</span>
          </div>
        ) : (
          <div>{buttonInfo.label.toUpperCase()}</div>
        )}
      </motion.div>
    </GridItem>
  );
};
