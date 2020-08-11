import React, { useState, useEffect } from "react";
import { IEntity } from "../models/entity";
import { Select } from "antd";
import { SelectValue } from "antd/lib/select";

export const SelectGroup = ({
  groupId,
  groups,
  onSelect,
}: ISelectGroupProps) => {
  const [selectedGroup, setSelectedGroup] = useState(-1);
  useEffect(() => {
    setSelectedGroup(groupId || -1);
  }, [groupId]);

  const groupOptions = groups.map((g) => (
    <Select.Option key={g.id} value={g.id}>
      {g.name.toUpperCase()}
    </Select.Option>
  ));

  const handleChange = (gId: SelectValue) => {
    const id = gId as number;
    onSelect(id);
    setSelectedGroup(id);
  };

  return (
    <Select
      defaultValue={-1}
      className="dropdown"
      onSelect={handleChange}
      value={selectedGroup}
    >
      <Select.Option key={-1} value={-1}>
        NONE
      </Select.Option>
      {groupOptions}
    </Select>
  );
};

interface ISelectGroupProps {
  groupId: number | undefined;
  groups: IEntity[];
  onSelect: (selected: number) => void;
}
