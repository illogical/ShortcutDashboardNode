import React from "react";

interface ButtonProps {
  label: string;
  color: string;
}

export const Button = (text: string) => (
  <React.Fragment>
    <input type="button" value={text} />
  </React.Fragment>
);
