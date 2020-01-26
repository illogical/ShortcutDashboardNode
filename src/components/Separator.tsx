import React from "react";

interface SeparatorProps {
  text: string;
}

export const Separator = ({ text }: SeparatorProps) => (
  <div className="separator">{text}</div>
);
