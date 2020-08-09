import * as React from "react";
import "../styles/button.css";
import { sendKeys, sendCommand, sendPython } from "../api/keySettings";
import { IButtonInfo } from "../models/buttonInfo";
import { motion } from "framer-motion";
import { Draggable } from "react-beautiful-dnd";

interface ButtonProps {
  buttonInfo: IButtonInfo;
  loading?: boolean;
  borderColor?: string;
  index: number;
  size?: "default" | "medium" | "large";
  editEnabled: boolean;
  draggable?: boolean;
  forceLabel?: boolean;
  onClick?: (buttonInfo: IButtonInfo) => void;
}

export const Button = ({
  buttonInfo,
  borderColor,
  size,
  index,
  draggable,
  editEnabled,
  forceLabel,
  onClick,
}: ButtonProps) => {
  const [loadingClass, setLoadingClass] = React.useState("");

  const handleClick = async () => {
    if (editEnabled) {
      if (onClick) {
        onClick(buttonInfo);
      }
      return;
    }

    try {
      setLoadingClass("loading");

      if (buttonInfo.command.exec) {
        await sendCommand(buttonInfo.command.exec);
      } else if (buttonInfo.command.python) {
        await sendPython(buttonInfo.command.python);
      } else if (buttonInfo.command.keys) {
        await sendKeys(buttonInfo.command.keys, buttonInfo.command.mods);
      }

      if (onClick) {
        onClick({ ...buttonInfo });
      }

      setLoadingClass("");
    } catch (error) {
      setLoadingClass("fail");
    }
  };

  const isSingleLetterLabel = buttonInfo.label.length === 1;
  const customFontSize =
    buttonInfo.icon === undefined && !isSingleLetterLabel
      ? { fontSize: getFontSize(buttonInfo.label) }
      : {}; //use sizes defined in the CSS when an icon is defined or when the label is a single letter

  //sets fontawesome's duotone icon secondary color
  let buttonStyles: any = {
    "--fa-primary-color": "#23c1ff",
    "--fa-secondary-color": "#ffbed4",
    "--fa-secondary-opacity": 0.45,
    ...customFontSize,
  };
  //changes button color while waiting for server response
  buttonStyles =
    loadingClass === "loading"
      ? buttonStyles
      : {
          ...buttonStyles,
          borderColor,
        };

  const getDragStyle = (isDragging: any, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  //X,Y,Z
  const singleLetterLabelClass = isSingleLetterLabel ? "letter" : "";

  //animations
  const variants = {
    initial: { opacity: 0.1, scale: 0.5 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, type: "tween" },
    },
    push: {
      scale: 0.85,
      transition: { type: "spring", damping: 6, stiffness: 160 },
    },
  };

  const button = (
    <motion.div
      className={`button drag ${singleLetterLabelClass} ${loadingClass} ${
        size || "default"
      }`}
      key={buttonInfo.id}
      id={buttonInfo.label}
      initial="initial"
      whileTap="push"
      animate="show"
      style={buttonStyles}
      onTap={handleClick}
      variants={variants}
    >
      {buttonInfo.icon && !forceLabel ? (
        <div>
          <span className={buttonInfo.icon} />
          <span className="hidden">{buttonInfo.label.toUpperCase()}</span>
        </div>
      ) : (
        <div>{buttonInfo.label.toUpperCase()}</div>
      )}
    </motion.div>
  );

  if (draggable) {
    return (
      <Draggable draggableId={buttonInfo.id.toString()} index={index}>
        {(provided, snapshot) => (
          <div
            className={`item ${snapshot.isDragging ? "dragging" : ""}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getDragStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            {button}
          </div>
        )}
      </Draggable>
    );
  }

  return <div className="item">{button}</div>;
};

const getFontSize = (label: string, isDefault?: boolean): string => {
  const defaultFontSize = 0.85;
  if (isDefault) {
    return numberToFontSize(defaultFontSize);
  }

  const maxIncrease = 0.1;
  const minDecrease = 0.07;

  let longestWord = label.split(" ").reduce((accumulator, currentValue) => {
    if (currentValue.length > accumulator.length) {
      return currentValue;
    } else {
      return accumulator;
    }
  });

  if (longestWord.length >= 12) {
    //smallest font size for long words ("proportional" being the longest thus far)
    return numberToFontSize(defaultFontSize - minDecrease);
  } else {
    //largest font size
    return numberToFontSize(defaultFontSize + maxIncrease);
  }
};

const numberToFontSize = (num: number) => {
  return `${num.toString()}em`;
};
