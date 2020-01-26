import React, { useEffect, useState } from "react";
import { MuuriComponent } from "muuri-react";
import createButton from "./LayoutGenerator";
import "../styles/grid.css";

const Grid = props => {
  return (
    <React.Fragment>
      <div className="grid">
        <MuuriComponent
          options={{
            layoutDuration: 400,
            dragEnabled: true,
            dragSortInterval: 50,
            dragReleaseDuration: 400,
            layoutOnResize: 100,
            layoutOnInit: true,
            layoutDuration: 300,
            layoutEasing: "ease",
            layout: {
              alignBottom: true
            }
          }}
        >
          {props.buttons}
        </MuuriComponent>
      </div>
    </React.Fragment>
  );
};

export default Grid;
