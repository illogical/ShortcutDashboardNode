import React from "react";
import { MuuriComponent } from "muuri-react";
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
            layoutEasing: "ease",
            layout: {
              alignBottom: true
            },
            dragPlaceholder: {
              enabled: false,
              duration: 300,
              easing: "ease",
              createElement: null,
              onCreate: null,
              onRemove: null
            },
            dragContainer: "drag"
          }}
        >
          {props.children}
        </MuuriComponent>
      </div>
    </React.Fragment>
  );
};

export default Grid;
