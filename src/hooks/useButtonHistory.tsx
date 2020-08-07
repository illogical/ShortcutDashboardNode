import { IButtonInfo } from "../models/buttonInfo";
import React from "react";
import * as lodash from "lodash";
import { Button } from "../components/Button";

export const useButtonHistory = (forceLabels: boolean) => {
  const [buttonHistory, setButtonHistory] = React.useState<
    Record<string, IButtonInfo>
  >({});

  const addButtonToHistory = (buttonInfo: IButtonInfo) => {
    setButtonHistory((x) => {
      // update lastUsed for this buttonupdatedHistory
      const updatedHistory = {
        ...x,
        [buttonInfo.label]: {
          ...buttonInfo,
          lastUsed: new Date(),
          size: undefined,
        },
      };

      return updatedHistory;
    });
  };

  const generateButtonHistory = () => {
    const buttons = Object.values(buttonHistory);
    const sortedButtons = lodash.sortBy(buttons, "lastUsed").reverse();
    return sortedButtons.map((button, index) => (
      <Button
        buttonInfo={button}
        index={index}
        forceLabel={forceLabels}
        editEnabled={false}
        onClick={addButtonToHistory}
        size={button.size}
        key={button.id}
      />
    ));
  };

  return [generateButtonHistory, addButtonToHistory] as const;
};
