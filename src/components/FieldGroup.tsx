import React from "react";

interface FieldGroupProps {
  label?: string;
}

export const FieldGroup: React.FC<FieldGroupProps> = ({ label, children }) => (
  <div className="field-group">
    {label && <div className="edit-label">{label}</div>}
    <div className="edit-field">{children}</div>
  </div>
);
