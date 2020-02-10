import * as React from "react";

interface GridItemProps {
  id: string;
}

export const GridItem: React.FunctionComponent<GridItemProps> = ({
  id,
  children
}) => {
  return (
    <div className="item" id={id}>
      {children}
    </div>
  );
};
