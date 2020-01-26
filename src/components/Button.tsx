import React from "react";
import "../styles/button.css";

interface ButtonProps {
  label: string;
  keys?: string;
  modifiers?: string;
  color?: string;
  onClick: () => void;
}

export const Button = ({ label, keys, modifiers, onClick }: ButtonProps) => {
  return (
    <React.Fragment>
      <div className="item" id={label}>
        <div className="item-content">
          {/* <div className="card">
            <div className="card-id">te</div>
            <div className="card-title">{label}</div>
            <div className="card-remove"></div>
          </div> */}

          <div className="button" onClick={onClick}>
            <div>{label}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
