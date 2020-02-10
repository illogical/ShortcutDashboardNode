import * as React from "react";
import "../styles/grid.css";

// Component Usage: <Grid propName="value"><div>Child content</div></Grid>
export const Grid: React.FunctionComponent = ({ children }) => {
  return (
    <React.Fragment>
      <div className="grid">{children}</div>
    </React.Fragment>
  );
};
