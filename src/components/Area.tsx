import * as React from "react";

export const Area: React.FunctionComponent<IAreaProps> = ({
  title,
  children
}) => {
  return (
    <React.Fragment>
      <div className="area-title">{title}</div>
      <div className="area">{children}</div>
    </React.Fragment>
  );
};

interface IAreaProps {
  title: string;
}
