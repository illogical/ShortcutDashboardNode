import React from "react";
import "../styles/button.css";

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
      <div className="item" id={label}>
        <div className="item-content" onClick={handleClick}>
          {/* <div className="card">
            <div className="card-id">te</div>
            <div className="card-title">{label}</div>
            <div className="card-remove"></div>
          </div> */}

          <div className="button">
            <div>{label}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
