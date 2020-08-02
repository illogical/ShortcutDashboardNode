import * as React from "react";
import "../styles/grid.css";

export const Grid: React.FunctionComponent = ({ children }) => {
  return (
    <React.Fragment>
      <div className="grid">{children}</div>
    </React.Fragment>
  );
};
